export default function Windmill({ palette }) {
  const { ground, accent } = palette;
  return (
    <div className="part" style={{ width: 160, height: 220 }}>
      <svg viewBox="0 0 160 220">
        <polygon points="60,220 100,220 90,90 70,90" fill={ground} />
        <path
          d="M80,80 L80,20 M80,80 L20,50 M80,80 L140,50 M80,80 L20,110"
          stroke={accent}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}