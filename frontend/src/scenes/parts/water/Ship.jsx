export default function Ship({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 260, height: 200 }}>
      <svg viewBox="0 0 260 200">
        <path d="M30,150 Q130,175 230,150 L210,180 Q130,200 50,180 Z" fill="#5a3a1a" />
        <rect x="125" y="30" width="8" height="120" fill="#3a2410" />
        <path d="M133,35 Q190,80 133,125 Z" fill="#111" />
        <path d="M125,35 Q70,80 125,125 Z" fill="#222" />
        <path d="M137,30 L175,42 L137,54 Z" fill={accent} />
      </svg>
    </div>
  );
}