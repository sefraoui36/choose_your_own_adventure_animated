# backend/schemas/scene.py
from typing import List, Literal
from pydantic import BaseModel, Field


# ─── Vocabulaire fermé (identique au backend story_generator.py) ───
SceneBiome = Literal[
    "ocean", "mountain", "desert", "forest", "space",
    "city", "snow", "beach", "plains", "interior",
]

TimeOfDay = Literal["dawn", "day", "dusk", "night"]

Weather = Literal["clear", "cloudy", "stormy", "foggy", "rainy", "snowy"]

Position = Literal[
    "center", "left", "right", "top-left", "top-right",
    "bottom-left", "bottom-right", "spread",
]

ParticlesType = Literal["none", "snow", "petals", "rain", "embers", "sparkles", "dust"]

AmbientType = Literal["none", "fog_light", "fog_heavy", "glow", "dark_vignette"]


# ─── Sous-modèles ───
class Palette(BaseModel):
    sky: str
    ground: str
    accent: str


class SceneElement(BaseModel):
    type: str
    position: Position = "spread"
    scale: float = Field(default=1.0, ge=0.3, le=2.0)


# ─── Modèle principal ───
class SceneConfig(BaseModel):
    biome: SceneBiome = "plains"
    timeOfDay: TimeOfDay = "day"
    weather: Weather = "clear"
    palette: Palette
    skyElements: List[str] = Field(default_factory=list)
    midgroundElements: List[SceneElement] = Field(default_factory=list)
    foregroundElements: List[SceneElement] = Field(default_factory=list)
    particles: ParticlesType = "none"
    ambient: AmbientType = "none"
    intensity: float = Field(default=0.5, ge=0.0, le=1.0)