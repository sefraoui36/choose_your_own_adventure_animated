export default function Lantern({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 40, height: 70 }}>
      <svg viewBox="0 0 40 70">
        <rect x="16" y="0" width="8" height="8" fill="#3a2410" />
        <rect x="8" y="8" width="24" height="50" rx="6" fill="#3a2410" />
        <circle cx="20" cy="33" r="8" fill={accent} opacity="0.9" />
      </svg>
    </div>
  );
}