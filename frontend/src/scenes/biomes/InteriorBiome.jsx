export default function InteriorBiome({ palette }) {
  const { sky, ground, accent } = palette;
  return (
    <>
      <div
        className="layer layer-bg"
        style={{ background: `linear-gradient(to bottom, ${sky} 0%, ${ground} 100%)` }}
      />
      <div
        className="layer"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: `linear-gradient(to bottom, ${ground} 0%, ${accent}33 100%)`,
        }}
      />
    </>
  );
}