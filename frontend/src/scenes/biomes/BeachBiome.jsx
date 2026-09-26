export default function BeachBiome({ palette }) {
  const { sky, ground } = palette;
  return (
    <>
      <div
        className="layer layer-bg"
        style={{
          background: `linear-gradient(to bottom, ${sky} 0%, #7dd3fc 50%, ${ground} 100%)`,
        }}
      />
      <svg
        className="layer"
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M0,360 Q360,340 720,360 T1440,360 L1440,500 L0,500 Z"
          fill="#fde68a"
          opacity="0.85"
        />
      </svg>
    </>
  );
}