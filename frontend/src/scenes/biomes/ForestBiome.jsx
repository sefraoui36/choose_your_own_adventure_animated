export default function ForestBiome({ palette }) {
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
        {[...Array(30)].map((_, i) => (
          <path
            key={i}
            d={`M${i * 50},420 L${i * 50 + 15},340 L${i * 50 + 30},420 Z`}
            fill={ground}
            opacity="0.7"
          />
        ))}
        <path d="M0,430 L1440,430 L1440,500 L0,500 Z" fill={ground} />
      </svg>
    </>
  );
}