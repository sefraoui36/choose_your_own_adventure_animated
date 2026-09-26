export default function CityBiome({ palette }) {
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
        {[...Array(20)].map((_, i) => {
          const w = 40 + ((i * 13) % 60);
          const h = 100 + ((i * 37) % 200);
          return (
            <rect
              key={i}
              x={i * 75}
              y={500 - h}
              width={w}
              height={h}
              fill={ground}
              opacity={0.6 + ((i * 7) % 40) / 100}
            />
          );
        })}
      </svg>
    </>
  );
}