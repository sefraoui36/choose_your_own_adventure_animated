export default function Pyramid({ palette }) {
  const { ground, accent } = palette;
  return (
    <div className="part" style={{ width: 300, height: 220 }}>
      <svg viewBox="0 0 300 220">
        <path d="M10,220 L150,20 L290,220 Z" fill={accent} />
        <path d="M150,20 L290,220 L150,220 Z" fill={ground} opacity="0.7" />
        <path d="M100,140 L200,140 M80,180 L220,180" stroke="#000" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
  );
}