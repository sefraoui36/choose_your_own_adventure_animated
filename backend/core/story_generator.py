import json
from sqlalchemy.orm import Session

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

from core.models import StoryLLMResponse, StoryNodeLLM
from core.prompts import STORY_PROMPT, VISUAL_CONFIG_PROMPT
from models.story import Story, StoryNode
from dotenv import load_dotenv

load_dotenv()


# ═══════════════════════════════════════════════════════════════
# 🎨 VOCABULAIRE FERMÉ POUR LA SCÈNE 3D
# Tout ce que le LLM a le droit de renvoyer doit être dans ces sets.
# ═══════════════════════════════════════════════════════════════

VALID_BIOMES = {
    "ocean", "mountain", "desert", "forest", "space",
    "city", "snow", "beach", "plains", "interior",
}

VALID_TIME = {"dawn", "day", "dusk", "night"}

VALID_WEATHER = {"clear", "cloudy", "stormy", "foggy", "rainy", "snowy"}

VALID_SKY = {"clouds", "birds", "stars", "planets", "moon", "sun", "aurora"}

VALID_MID = {
    "tree_pine", "tree_palm", "tree_dead", "tree_sakura", "rock", "mountain",
    "cactus", "bush", "castle", "house_pink", "temple_asia", "pyramid",
    "windmill", "cabin", "skyscraper", "spaceship", "longship", "ship",
}

VALID_FORE = {
    "rock", "bush", "cactus", "treasure_chest", "lantern", "sword",
    "banner", "crystal", "tree_pine", "tree_palm", "tree_dead",
}

VALID_POSITIONS = {
    "center", "left", "right", "top-left", "top-right",
    "bottom-left", "bottom-right", "spread",
}

VALID_PARTICLES = {"none", "snow", "petals", "rain", "embers", "sparkles", "dust"}

VALID_AMBIENT = {"none", "fog_light", "fog_heavy", "glow", "dark_vignette"}


# ═══════════════════════════════════════════════════════════════
# 🛡️ SANITIZER — nettoie et valide la config LLM
# ═══════════════════════════════════════════════════════════════

def _default_scene() -> dict:
    """Scène neutre utilisée si le LLM échoue complètement."""
    return {
        "biome": "plains",
        "timeOfDay": "day",
        "weather": "clear",
        "palette": {"sky": "#0f172a", "ground": "#1e293b", "accent": "#94a3b8"},
        "skyElements": [],
        "midgroundElements": [],
        "foregroundElements": [],
        "particles": "none",
        "ambient": "none",
        "intensity": 0.5,
    }


def _sanitize_visual_config(raw) -> dict:
    """
    Valide chaque champ de la config LLM.
    Tout ce qui est invalide est remplacé par une valeur par défaut.
    """
    fallback = _default_scene()

    if not isinstance(raw, dict):
        return fallback

    # ── biome ──
    biome = raw.get("biome")
    if biome not in VALID_BIOMES:
        biome = "plains"

    # ── timeOfDay ──
    time_of_day = raw.get("timeOfDay")
    if time_of_day not in VALID_TIME:
        time_of_day = "day"

    # ── weather ──
    weather = raw.get("weather")
    if weather not in VALID_WEATHER:
        weather = "clear"

    # ── palette ──
    palette = raw.get("palette")
    if (
        not isinstance(palette, dict)
        or not all(k in palette for k in ("sky", "ground", "accent"))
        or not all(isinstance(palette[k], str) for k in ("sky", "ground", "accent"))
    ):
        palette = fallback["palette"]

    # ── skyElements (liste de strings) ──
    raw_sky = raw.get("skyElements") or []
    if not isinstance(raw_sky, list):
        raw_sky = []
    sky = [e for e in raw_sky if isinstance(e, str) and e in VALID_SKY][:3]

    # ── midgroundElements (liste de dicts) ──
    mid = []
    raw_mid = raw.get("midgroundElements") or []
    if isinstance(raw_mid, list):
        for el in raw_mid[:4]:
            if not isinstance(el, dict):
                continue
            t = el.get("type")
            if t not in VALID_MID:
                continue
            pos = el.get("position")
            if pos not in VALID_POSITIONS:
                pos = "spread"
            try:
                scale = float(el.get("scale", 1.0))
                scale = max(0.3, min(2.0, scale))
            except (TypeError, ValueError):
                scale = 1.0
            mid.append({"type": t, "position": pos, "scale": scale})

    # ── foregroundElements (liste de dicts) ──
    fore = []
    raw_fore = raw.get("foregroundElements") or []
    if isinstance(raw_fore, list):
        for el in raw_fore[:3]:
            if not isinstance(el, dict):
                continue
            t = el.get("type")
            if t not in VALID_FORE:
                continue
            pos = el.get("position")
            if pos not in VALID_POSITIONS:
                pos = "spread"
            try:
                scale = float(el.get("scale", 1.0))
                scale = max(0.3, min(2.0, scale))
            except (TypeError, ValueError):
                scale = 1.0
            fore.append({"type": t, "position": pos, "scale": scale})

    # ── particles ──
    particles = raw.get("particles")
    if particles not in VALID_PARTICLES:
        particles = "none"

    # ── ambient ──
    ambient = raw.get("ambient")
    if ambient not in VALID_AMBIENT:
        ambient = "none"

    # ── intensity ──
    try:
        intensity = float(raw.get("intensity", 0.5))
        intensity = max(0.0, min(1.0, intensity))
    except (TypeError, ValueError):
        intensity = 0.5

    return {
        "biome": biome,
        "timeOfDay": time_of_day,
        "weather": weather,
        "palette": palette,
        "skyElements": sky,
        "midgroundElements": mid,
        "foregroundElements": fore,
        "particles": particles,
        "ambient": ambient,
        "intensity": intensity,
    }


# ═══════════════════════════════════════════════════════════════
# 📖 STORY GENERATOR
# ═══════════════════════════════════════════════════════════════

class StoryGenerator:

    @classmethod
    def _get_llm_(cls):
        return ChatGroq(model="openai/gpt-oss-120b")

    # ───────────────────────────────────────────────────────────
    # 1. Génération complète de l'histoire
    # ───────────────────────────────────────────────────────────
    @classmethod
    def generate_story(cls, db: Session, session_id: str, theme: str = "fantasy") -> Story:
        llm = cls._get_llm_()
        story_parser = PydanticOutputParser(pydantic_object=StoryLLMResponse)

        # ── 1. Generate the story ──
        prompt = ChatPromptTemplate.from_messages([
            ("system", STORY_PROMPT)
        ]).partial(format_instructions=story_parser.get_format_instructions())

        raw_response = llm.invoke(prompt.invoke({}))
        response_text = raw_response
        if hasattr(raw_response, "content"):
            response_text = raw_response.content

        story_structure = story_parser.parse(response_text)

        # ── 2. Generate the visual config ──
        visual_config = cls._generate_visual_config(
            llm, story_structure.title, story_structure.rootNode.content, theme
        )

        # ── 3. Save the story with the visual config ──
        story_db = Story(
            title=story_structure.title,
            session_id=session_id,
            visual_config=visual_config,
        )
        db.add(story_db)
        db.flush()

        root_node_data = story_structure.rootNode
        if isinstance(root_node_data, dict):
            root_node_data = StoryNodeLLM.model_validate(root_node_data)

        cls._process_story_node(db, story_db.id, root_node_data, is_root=True)
        db.commit()
        return story_db

    # ───────────────────────────────────────────────────────────
    # 2. Génération de la config visuelle (scène)
    # ───────────────────────────────────────────────────────────
    @classmethod
    def _generate_visual_config(cls, llm, title: str, opening: str, theme: str) -> dict:
        try:
            visual_prompt = ChatPromptTemplate.from_messages([
                ("system", VISUAL_CONFIG_PROMPT),
                ("human", f"Theme: {theme}\nTitle: {title}\nOpening: {opening}")
            ])
            response = llm.invoke(visual_prompt.invoke({}))
            text = response.content if hasattr(response, "content") else str(response)

            print(f"[VISUAL RAW] {text[:400]}")

            # Extract the first {...} block
            start = text.find("{")
            end = text.rfind("}")
            if start == -1 or end == -1:
                print("[VISUAL ERROR] no JSON object in response")
                return _default_scene()

            parsed = json.loads(text[start:end + 1])
            sanitized = _sanitize_visual_config(parsed)

            print(
                f"[VISUAL OK] biome={sanitized['biome']} "
                f"sky={len(sanitized['skyElements'])} "
                f"mid={len(sanitized['midgroundElements'])} "
                f"fore={len(sanitized['foregroundElements'])} "
                f"particles={sanitized['particles']}"
            )
            return sanitized

        except Exception as e:
            print(f"[VISUAL CONFIG ERROR] {e}")
            return _default_scene()

    # ───────────────────────────────────────────────────────────
    # 3. Traitement récursif des nœuds de l'histoire
    # ───────────────────────────────────────────────────────────
    @classmethod
    def _process_story_node(
        cls,
        db: Session,
        story_id: int,
        node_data: StoryNodeLLM,
        is_root: bool = False,
        depth: int = 0,
    ) -> StoryNode:
        # Protection contre les cycles / récursion infinie
        if depth > 12:
            raise ValueError("Story too deep — possible cycle in LLM output")

        # Ensure node_data is a Pydantic model
        if isinstance(node_data, dict):
            node_data = StoryNodeLLM.model_validate(node_data)

        node = StoryNode(
            story_id=story_id,
            content=node_data.content,
            is_root=is_root,
            is_ending=node_data.isEnding,
            is_wining_ending=node_data.isWiningEnding,
            options=[],
        )
        db.add(node)
        db.flush()

        if not node.is_ending and node_data.options:
            options_list = []
            for option_data in node_data.options:
                next_node = option_data.nextNode

                if not next_node:
                    continue

                if isinstance(next_node, dict):
                    next_node = StoryNodeLLM.model_validate(next_node)

                child_node = cls._process_story_node(
                    db, story_id, next_node, is_root=False, depth=depth + 1
                )
                options_list.append({
                    "text": option_data.text,
                    "node_id": child_node.id,
                })
            node.options = options_list

        db.flush()
        return node
