export default function Bush({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 80, height: 50 }}>
      <svg viewBox="0 0 80 50">
        <ellipse cx="40" cy="35" rx="35" ry="15" fill={accent} opacity="0.85" />
      </svg>
    </div>
  );
}