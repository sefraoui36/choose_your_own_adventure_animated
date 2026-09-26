export default function Cactus({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 80, height: 140 }}>
      <svg viewBox="0 0 80 140">
        <rect x="35" y="20" width="14" height="120" rx="7" fill={accent} />
        <rect x="15" y="50" width="14" height="40" rx="7" fill={accent} />
        <rect x="55" y="60" width="14" height="35" rx="7" fill={accent} />
      </svg>
    </div>
  );
}