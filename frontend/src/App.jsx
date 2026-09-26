import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SceneRenderer from "./scenes/SceneRenderer.jsx";
import StoryGenerator from "./components/StoryGenerator.jsx";
import StoryLoader from "./components/StoryLoader.jsx";
import { getThemePreview } from "./util.js";

function App() {
  // Scène courante affichée en fond
  const [scene, setScene] = useState(() => {
    try {
      const saved = sessionStorage.getItem("lastScene");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Écoute les mises à jour de scène (déclenchées par StoryLoader)
  useEffect(() => {
    const onUpdate = () => {
      try {
        const saved = sessionStorage.getItem("lastScene");
        setScene(saved ? JSON.parse(saved) : null);
      } catch {
        setScene(null);
      }
    };

    const onPreview = (e) => {
  const theme = e.detail?.theme;
  console.log("[onPreview] reçu theme =", theme);        // ← AJOUTE
  if (theme) {
    const preview = getThemePreview(theme);
    console.log("[onPreview] preview =", preview.biome);  // ← AJOUTE
    setScene(preview);
  }
};

    window.addEventListener("scene-updated", onUpdate);
    window.addEventListener("theme-preview", onPreview);

    return () => {
      window.removeEventListener("scene-updated", onUpdate);
      window.removeEventListener("theme-preview", onPreview);
    };
  }, []);

  return (
    <Router>
      {/* Scène en fond de TOUTE la page */}
      <SceneRenderer scene={scene} />

      <div className="app-container">
        <header>
          <h1>Interactive Story Generator</h1>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<StoryGenerator />} />
            <Route path="/story/:id" element={<StoryLoader />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; {new Date().getFullYear()} Interactive Story Generator</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;