import { useEffect } from "react";
import gsap from "gsap";

/**
 * Parallaxe souris : chaque couche bouge selon son facteur.
 * @param {React.RefObject} rootRef - élément racine de la scène
 * @param {Array<{selector: string, factor: number}>} layers
 */
export function useParallax(rootRef, layers) {
  useEffect(() => {
    if (!rootRef.current) return;

    const onMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      layers.forEach(({ selector, factor }) => {
        const el = rootRef.current?.querySelector(selector);
        if (!el) return;
        gsap.to(el, {
          x: -x * factor,
          y: -y * factor * 0.5,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [rootRef, layers]);
}