export default function OceanBiome({ palette }) {
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
        <path
          d="M0,320 Q360,280 720,320 T1440,320 L1440,500 L0,500 Z"
          fill={ground}
          opacity="0.9"
        />
        <path
          d="M0,360 Q360,330 720,360 T1440,360 L1440,500 L0,500 Z"
          fill={sky}
          opacity="0.6"
        />
      </svg>
    </>
  );
}