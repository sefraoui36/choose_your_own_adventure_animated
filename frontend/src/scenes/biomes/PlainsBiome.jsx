export default function PlainsBiome({ palette }) {
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
        <path d="M0,380 Q360,360 720,380 T1440,380 L1440,500 L0,500 Z" fill={ground} />
      </svg>
    </>
  );
}