export default function Moon({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 80, height: 80 }}>
      <svg viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="30" fill={accent} />
        <circle cx="52" cy="32" r="28" fill="#000" opacity="0.9" />
      </svg>
    </div>
  );
}