export default function Longship({ palette }) {
  const { ground, accent } = palette;
  return (
    <div className="part" style={{ width: 240, height: 130 }}>
      <svg viewBox="0 0 240 130">
        <path d="M20,100 Q120,120 220,100 L210,115 Q120,130 30,115 Z" fill={ground} />
        <rect x="118" y="20" width="6" height="80" fill="#3a2410" />
        <path d="M124,25 L180,45 L124,70 Z" fill={accent} />
        <path d="M118,25 L62,45 L118,70 Z" fill={accent} opacity="0.8" />
      </svg>
    </div>
  );
}