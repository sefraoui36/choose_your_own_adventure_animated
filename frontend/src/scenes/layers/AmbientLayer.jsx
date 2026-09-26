export default function AmbientLayer({ type, palette }) {
  if (!type || type === "none") return null;

  const accent = palette?.accent || "#ffffff";

  if (type === "fog_light") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 80%, ${accent}22 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />
    );
  }

  if (type === "fog_heavy") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 90%, ${accent}33 0%, ${accent}11 40%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
    );
  }

  if (type === "glow") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${accent}22 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
    );
  }

  if (type === "dark_vignette") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, transparent 30%, #000000cc 100%)`,
          pointerEvents: "none",
        }}
      />
    );
  }

  return null;
}