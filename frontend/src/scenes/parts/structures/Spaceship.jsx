export default function Spaceship({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 180, height: 100 }}>
      <svg viewBox="0 0 180 100">
        <ellipse cx="90" cy="50" rx="70" ry="20" fill="#cbd5e1" />
        <ellipse cx="90" cy="50" rx="30" ry="15" fill={accent} />
        <circle cx="40" cy="50" r="4" fill="#fff" />
        <circle cx="140" cy="50" r="4" fill="#fff" />
      </svg>
    </div>
  );
}