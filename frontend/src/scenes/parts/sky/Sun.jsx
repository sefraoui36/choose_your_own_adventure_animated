export default function Sun({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 120, height: 120 }}>
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="35" fill={accent} opacity="0.9" />
        <circle cx="60" cy="60" r="50" fill={accent} opacity="0.25" />
        <circle cx="60" cy="60" r="65" fill={accent} opacity="0.1" />
      </svg>
    </div>
  );
}