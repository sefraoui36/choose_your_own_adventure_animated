export default function Banner({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 60, height: 140 }}>
      <svg viewBox="0 0 60 140">
        <rect x="28" y="0" width="4" height="140" fill="#3a2410" />
        <path d="M32,10 L60,10 L60,80 L32,80 Z" fill={accent} />
        <path d="M32,80 L46,90 L32,100 Z" fill={accent} />
      </svg>
    </div>
  );
}