export default function TempleAsia({ palette }) {
  const { ground, accent } = palette;
  return (
    <div className="part" style={{ width: 260, height: 220 }}>
      <svg viewBox="0 0 260 220">
        <rect x="50" y="120" width="160" height="100" fill={ground} />
        <path d="M20,120 L130,40 L240,120 Z" fill={accent} />
        <path d="M40,120 L130,55 L220,120 Z" fill="#000" opacity="0.3" />
        <rect x="120" y="150" width="20" height="70" fill="#000" opacity="0.5" />
      </svg>
    </div>
  );
}