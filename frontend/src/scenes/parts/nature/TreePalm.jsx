export default function TreePalm({ palette }) {
  const { ground, accent } = palette;
  return (
    <div className="part" style={{ width: 140, height: 200 }}>
      <svg viewBox="0 0 140 200">
        <path d="M70,200 Q65,120 60,60" stroke="#5a3a1a" strokeWidth="8" fill="none" />
        <ellipse cx="60" cy="60" rx="50" ry="20" fill={ground} />
        <ellipse cx="60" cy="60" rx="40" ry="15" fill={accent} opacity="0.6" />
      </svg>
    </div>
  );
}