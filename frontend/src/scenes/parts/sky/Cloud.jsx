export default function Cloud({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 180, height: 70 }}>
      <svg viewBox="0 0 180 70">
        <ellipse cx="60" cy="45" rx="45" ry="20" fill={accent} opacity="0.35" />
        <ellipse cx="110" cy="40" rx="55" ry="25" fill={accent} opacity="0.3" />
      </svg>
    </div>
  );
}