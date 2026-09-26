export default function Rock({ palette }) {
  const { ground } = palette;
  return (
    <div className="part" style={{ width: 80, height: 60 }}>
      <svg viewBox="0 0 80 60">
        <path d="M10,55 L20,20 L45,15 L70,40 L65,55 Z" fill={ground} />
        <path d="M25,30 L40,25 L55,35" stroke="#00000033" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}