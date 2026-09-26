export default function TreasureChest({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 80, height: 70 }}>
      <svg viewBox="0 0 80 70">
        <rect x="10" y="30" width="60" height="35" fill="#5a3a1a" />
        <path d="M10,30 Q40,5 70,30 Z" fill="#7a4a20" />
        <rect x="35" y="40" width="10" height="15" fill={accent} />
      </svg>
    </div>
  );
}