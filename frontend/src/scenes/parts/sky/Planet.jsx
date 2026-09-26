export default function Planet({ palette }) {
  const { accent, ground } = palette;
  return (
    <div className="part" style={{ width: 120, height: 120 }}>
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="40" fill={accent} />
        <ellipse cx="60" cy="60" rx="70" ry="12" fill={ground} opacity="0.6" />
      </svg>
    </div>
  );
}