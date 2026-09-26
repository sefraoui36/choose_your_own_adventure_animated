import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function ParticlesLayer({ type, palette, intensity = 0.5 }) {
  const ref = useRef(null);

  useGSAP(() => {
    if (!ref.current || !type || type === "none") return;
    const particles = ref.current.querySelectorAll(".particle");
    if (!particles.length) return;

    const duration = 12 - intensity * 6;

    if (type === "snow" || type === "petals") {
      particles.forEach((p) => {
        gsap.fromTo(
          p,
          { y: -50, x: gsap.utils.random(-30, 30), rotation: 0 },
          {
            y: window.innerHeight + 50,
            x: `+=${gsap.utils.random(-80, 80)}`,
            rotation: 360,
            duration: gsap.utils.random(duration, duration * 1.8),
            repeat: -1,
            delay: gsap.utils.random(0, duration),
            ease: "none",
          }
        );
      });
    } else if (type === "rain") {
      particles.forEach((p) => {
        gsap.fromTo(
          p,
          { y: -100 },
          {
            y: window.innerHeight + 100,
            duration: gsap.utils.random(1, 2),
            repeat: -1,
            delay: gsap.utils.random(0, 2),
            ease: "none",
          }
        );
      });
    } else if (type === "embers") {
      particles.forEach((p) => {
        gsap.fromTo(
          p,
          { y: window.innerHeight + 50, x: gsap.utils.random(0, window.innerWidth), opacity: 0 },
          {
            y: -50,
            opacity: 1,
            duration: gsap.utils.random(duration, duration * 1.5),
            repeat: -1,
            delay: gsap.utils.random(0, duration),
            ease: "none",
          }
        );
      });
    } else if (type === "sparkles") {
      particles.forEach((p) => {
        gsap.fromTo(
          p,
          { opacity: 0, scale: 0.3 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            delay: gsap.utils.random(0, 3),
            ease: "power2.out",
          }
        );
      });
    } else if (type === "dust") {
      particles.forEach((p) => {
        gsap.to(p, {
          x: `+=${gsap.utils.random(-100, 100)}`,
          y: `+=${gsap.utils.random(-50, 50)}`,
          duration: gsap.utils.random(duration, duration * 2),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }
  }, { scope: ref, dependencies: [type] });

  if (!type || type === "none") return null;

  const particles = [];
  const count = type === "rain" ? 120 : type === "sparkles" ? 40 : 60;
  const color = palette?.accent || "#ffffff";

  for (let i = 0; i < count; i++) {
    const size = type === "rain" ? 2 : type === "sparkles" ? 4 : 5;
    particles.push(
      <div
        key={i}
        className="particle"
        style={{
          position: "absolute",
          left: `${Math.random() * 100}%`,
          top: 0,
          width: size,
          height: type === "rain" ? 16 : size,
          background: color,
          borderRadius: type === "rain" ? 0 : "50%",
          opacity: type === "sparkles" ? 0 : 0.8,
          filter: "blur(0.5px)",
          pointerEvents: "none",
        }}
      />
    );
  }

  return <div ref={ref} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>{particles}</div>;
}