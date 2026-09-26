export default function Cabin({ palette }) {
  const { ground, accent } = palette;
  return (
    <div className="part" style={{ width: 160, height: 140 }}>
      <svg viewBox="0 0 160 140">
        <rect x="30" y="60" width="100" height="80" fill={ground} />
        <path d="M20,60 L80,15 L140,60 Z" fill={accent} />
        <rect x="70" y="90" width="20" height="50" fill="#3a2410" />
      </svg>
    </div>
  );
}