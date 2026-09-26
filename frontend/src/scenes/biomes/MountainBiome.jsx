export default function MountainBiome({ palette }) {
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
          d="M0,380 L200,200 L400,340 L600,150 L800,300 L1000,180 L1200,320 L1440,220 L1440,500 L0,500 Z"
          fill={ground}
          opacity="0.85"
        />
        <path
          d="M0,420 L300,300 L600,400 L900,280 L1200,380 L1440,320 L1440,500 L0,500 Z"
          fill={sky}
          opacity="0.5"
        />
      </svg>
    </>
  );
}