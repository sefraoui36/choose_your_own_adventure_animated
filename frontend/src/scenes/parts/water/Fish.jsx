export default function Fish({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 50, height: 30 }}>
      <svg viewBox="0 0 50 30">
        <ellipse cx="25" cy="15" rx="18" ry="9" fill={accent} />
        <path d="M43,15 L50,5 L50,25 Z" fill={accent} />
        <circle cx="15" cy="13" r="2" fill="#000" />
      </svg>
    </div>
  );
}