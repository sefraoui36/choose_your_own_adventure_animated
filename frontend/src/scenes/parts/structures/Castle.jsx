export default function Castle({ palette }) {
  const { ground, accent } = palette;
  return (
    <div className="part" style={{ width: 260, height: 220 }}>
      <svg viewBox="0 0 260 220">
        <rect x="30" y="100" width="200" height="120" fill={ground} />
        <rect x="40" y="70" width="40" height="50" fill={ground} />
        <rect x="110" y="50" width="40" height="70" fill={ground} />
        <rect x="180" y="70" width="40" height="50" fill={ground} />
        <path d="M40,70 L60,50 L80,70 Z" fill={accent} />
        <path d="M110,50 L130,30 L150,50 Z" fill={accent} />
        <path d="M180,70 L200,50 L220,70 Z" fill={accent} />
        <rect x="120" y="150" width="20" height="40" fill="#000" opacity="0.6" />
      </svg>
    </div>
  );
}