import SceneComposer from "./SceneComposer.jsx";
import "./scenes.css";

const DEFAULT_CONFIG = {
  biome: "plains",
  timeOfDay: "day",
  weather: "clear",
  palette: { sky: "#0f172a", ground: "#1e293b", accent: "#94a3b8" },
  skyElements: [],
  midgroundElements: [],
  foregroundElements: [],
  particles: "none",
  ambient: "none",
  intensity: 0.5,
};

export default function SceneRenderer({ scene }) {
  const config = scene && scene.biome ? scene : DEFAULT_CONFIG;

  return (
    <div className="scene-root" data-mood={config.mood} data-time={config.timeOfDay}>
      <SceneComposer config={config} />
    </div>
  );
}