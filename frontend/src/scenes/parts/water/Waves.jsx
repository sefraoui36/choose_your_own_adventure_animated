export default function Waves({ palette }) {
  const { ground } = palette;
  return (
    <div className="part" style={{ width: "100%", height: 120 }}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          d="M0,60 Q360,20 720,60 T1440,60 L1440,120 L0,120 Z"
          fill={ground}
          opacity="0.8"
        />
      </svg>
    </div>
  );
}