export default function DesertBiome({ palette }) {
  const { sky, ground } = palette;
  return (
    <>
      <div
        className="layer layer-bg"
        style={{ background: `linear-gradient(to bottom, ${sky} 0%, ${ground} 100%)` }}
      />
      <svg
        className="layer"
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0 }}
      >
        <path d="M0,400 Q360,320 720,400 T1440,400 L1440,500 L0,500 Z" fill={ground} />
      </svg>
    </>
  );
}