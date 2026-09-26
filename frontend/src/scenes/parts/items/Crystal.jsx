export default function Crystal({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 50, height: 80 }}>
      <svg viewBox="0 0 50 80">
        <polygon points="25,0 45,30 35,80 15,80 5,30" fill={accent} opacity="0.85" />
        <polygon points="25,0 45,30 25,40" fill="#fff" opacity="0.3" />
      </svg>
    </div>
  );
}