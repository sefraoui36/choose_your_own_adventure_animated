export default function Sword({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 120, height: 30 }}>
      <svg viewBox="0 0 120 30">
        <polygon points="10,15 100,10 100,20 10,15" fill="#cbd5e1" />
        <rect x="95" y="5" width="6" height="20" fill={accent} />
        <rect x="105" y="13" width="15" height="4" fill="#3a2410" />
      </svg>
    </div>
  );
}