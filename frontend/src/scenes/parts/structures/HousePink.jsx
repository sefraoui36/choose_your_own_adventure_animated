export default function HousePink() {
  return (
    <div className="part" style={{ width: 200, height: 180 }}>
      <svg viewBox="0 0 200 180">
        <rect x="30" y="80" width="140" height="100" fill="#ffc0e0" />
        <path d="M20,80 L100,20 L180,80 Z" fill="#ff69b4" />
        <rect x="80" y="120" width="40" height="60" fill="#fff" />
        <circle cx="100" cy="40" r="8" fill="#fff" />
      </svg>
    </div>
  );
}