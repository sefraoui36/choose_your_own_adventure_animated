export default function SpaceBiome({ palette }) {
  const { sky } = palette;
  return (
    <div
      className="layer layer-bg"
      style={{ background: `radial-gradient(circle at 30% 30%, ${sky}ee 0%, #000 80%)` }}
    />
  );
}