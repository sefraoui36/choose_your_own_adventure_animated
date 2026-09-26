export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

/**
 * Détecte un biome + palette depuis un thème tapé par l'utilisateur.
 * Utilisé pour l'aperçu INSTANTANÉ pendant que l'utilisateur tape.
 * Une fois la story générée, le backend envoie la vraie config.
 */
export function getThemePreview(theme) {
  const t = (theme || "").toLowerCase();

  // Mapping mots-clés → biome + palette + éléments
  const rules = [
    {
      match: ["pirat", "ocean", "sea", "mer", "ship", "bateau"],
      config: {
        biome: "ocean",
        timeOfDay: "dusk",
        weather: "clear",
        palette: { sky: "#0a1929", ground: "#1a3a4a", accent: "#d4a574" },
        skyElements: ["clouds", "birds"],
        midgroundElements: [
          { type: "ship", position: "center", scale: 1.0 },
          { type: "rock", position: "right", scale: 0.7 },
        ],
        foregroundElements: [{ type: "treasure_chest", position: "bottom-left", scale: 1.0 }],
        particles: "none",
        ambient: "fog_light",
        intensity: 0.6,
      },
    },
    {
      match: ["space", "galaxy", "espace", "star", "étoile", "alien", "cosmos"],
      config: {
        biome: "space",
        timeOfDay: "night",
        weather: "clear",
        palette: { sky: "#1e1b4b", ground: "#020617", accent: "#a78bfa" },
        skyElements: ["stars", "planets"],
        midgroundElements: [{ type: "spaceship", position: "center", scale: 1.0 }],
        foregroundElements: [],
        particles: "sparkles",
        ambient: "glow",
        intensity: 0.5,
      },
    },
    {
      match: ["medieval", "chevalier", "knight", "castle", "château", "dragon"],
      config: {
        biome: "mountain",
        timeOfDay: "dusk",
        weather: "cloudy",
        palette: { sky: "#1a0f0a", ground: "#3a2418", accent: "#d97706" },
        skyElements: ["clouds", "birds"],
        midgroundElements: [
          { type: "castle", position: "center", scale: 1.0 },
          { type: "tree_pine", position: "left", scale: 0.8 },
        ],
        foregroundElements: [{ type: "sword", position: "bottom-right", scale: 1.0 }],
        particles: "embers",
        ambient: "fog_light",
        intensity: 0.7,
      },
    },
    {
      match: ["barbie", "pink", "rose", "dream", "rêve"],
      config: {
        biome: "beach",
        timeOfDay: "day",
        weather: "clear",
        palette: { sky: "#ffe4ec", ground: "#ff9ec4", accent: "#ff69b4" },
        skyElements: ["clouds", "sun"],
        midgroundElements: [{ type: "house_pink", position: "center", scale: 1.0 }],
        foregroundElements: [{ type: "tree_palm", position: "right", scale: 0.9 }],
        particles: "sparkles",
        ambient: "glow",
        intensity: 0.4,
      },
    },
    {
      match: ["japon", "japan", "samourai", "samurai", "sakura", "jap"],
      config: {
        biome: "mountain",
        timeOfDay: "dawn",
        weather: "clear",
        palette: { sky: "#2a1a2a", ground: "#3a2a1a", accent: "#d94f4f" },
        skyElements: ["clouds", "birds"],
        midgroundElements: [
          { type: "temple_asia", position: "center", scale: 1.0 },
          { type: "tree_sakura", position: "left", scale: 0.9 },
        ],
        foregroundElements: [{ type: "rock", position: "bottom-right", scale: 1.0 }],
        particles: "petals",
        ambient: "fog_light",
        intensity: 0.5,
      },
    },
    {
      match: ["viking", "norse", "nordique"],
      config: {
        biome: "snow",
        timeOfDay: "dusk",
        weather: "snowy",
        palette: { sky: "#0f172a", ground: "#334155", accent: "#94a3b8" },
        skyElements: ["clouds"],
        midgroundElements: [
          { type: "longship", position: "center", scale: 1.0 },
          { type: "tree_pine", position: "left", scale: 0.8 },
        ],
        foregroundElements: [{ type: "rock", position: "bottom-right", scale: 1.0 }],
        particles: "snow",
        ambient: "fog_heavy",
        intensity: 0.8,
      },
    },
    {
      match: ["égypte", "egypt", "pyramide", "pyramid", "pharaon"],
      config: {
        biome: "desert",
        timeOfDay: "day",
        weather: "clear",
        palette: { sky: "#fbbf24", ground: "#d97706", accent: "#fef3c7" },
        skyElements: ["sun"],
        midgroundElements: [
          { type: "pyramid", position: "center", scale: 1.0 },
          { type: "pyramid", position: "right", scale: 0.7 },
        ],
        foregroundElements: [{ type: "rock", position: "bottom-left", scale: 0.8 }],
        particles: "dust",
        ambient: "glow",
        intensity: 0.6,
      },
    },
    {
      match: ["halloween", "horreur", "horror", "zombie", "ghost", "fantôme"],
      config: {
        biome: "forest",
        timeOfDay: "night",
        weather: "foggy",
        palette: { sky: "#000000", ground: "#1a0000", accent: "#991b1b" },
        skyElements: ["moon"],
        midgroundElements: [
          { type: "tree_dead", position: "left", scale: 1.0 },
          { type: "tree_dead", position: "right", scale: 0.9 },
        ],
        foregroundElements: [{ type: "lantern", position: "bottom-left", scale: 1.0 }],
        particles: "fog" === "particles" ? "none" : "none",
        ambient: "fog_heavy",
        intensity: 0.9,
      },
    },
    {
      match: ["noël", "noel", "christmas", "santa", "hiver", "winter"],
      config: {
        biome: "snow",
        timeOfDay: "night",
        weather: "snowy",
        palette: { sky: "#1e293b", ground: "#e2e8f0", accent: "#dc2626" },
        skyElements: ["stars", "moon"],
        midgroundElements: [{ type: "cabin", position: "center", scale: 1.0 }],
        foregroundElements: [{ type: "tree_pine", position: "left", scale: 1.0 }],
        particles: "snow",
        ambient: "glow",
        intensity: 0.7,
      },
    },
    {
      match: ["nature", "forest", "forêt", "jungle", "montagne", "mountain"],
      config: {
        biome: "forest",
        timeOfDay: "day",
        weather: "clear",
        palette: { sky: "#86efac", ground: "#14532d", accent: "#22c55e" },
        skyElements: ["clouds", "sun", "birds"],
        midgroundElements: [
          { type: "tree_pine", position: "left", scale: 1.0 },
          { type: "tree_pine", position: "right", scale: 1.0 },
        ],
        foregroundElements: [{ type: "bush", position: "bottom-left", scale: 1.0 }],
        particles: "none",
        ambient: "fog_light",
        intensity: 0.5,
      },
    },
    {
      match: ["city", "ville", "cyberpunk", "urban", "néon", "neon"],
      config: {
        biome: "city",
        timeOfDay: "night",
        weather: "rainy",
        palette: { sky: "#1e1b4b", ground: "#0f172a", accent: "#a78bfa" },
        skyElements: ["stars"],
        midgroundElements: [{ type: "skyscraper", position: "center", scale: 1.0 }],
        foregroundElements: [],
        particles: "rain",
        ambient: "glow",
        intensity: 0.7,
      },
    },
  ];

  const rule = rules.find((r) => r.match.some((m) => t.includes(m)));

  if (rule) return rule.config;

  // Fallback : plains neutre
  return {
    biome: "plains",
    timeOfDay: "day",
    weather: "clear",
    palette: { sky: "#0f172a", ground: "#1e293b", accent: "#94a3b8" },
    skyElements: ["clouds"],
    midgroundElements: [],
    foregroundElements: [],
    particles: "none",
    ambient: "none",
    intensity: 0.5,
  };
}