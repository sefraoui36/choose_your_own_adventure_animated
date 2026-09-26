export default function TreePine({ palette }) {
  const { ground, accent } = palette;
  return (
    <div className="part" style={{ width: 120, height: 180 }}>
      <svg viewBox="0 0 120 180">
        <rect x="55" y="120" width="10" height="50" fill="#3a2410" />
        <path d="M60,20 L20,120 L100,120 Z" fill={ground} />
        <path d="M60,50 L30,110 L90,110 Z" fill={accent} opacity="0.7" />
      </svg>
    </div>
  );
}