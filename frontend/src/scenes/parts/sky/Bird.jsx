export default function Bird({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 40, height: 20 }}>
      <svg viewBox="0 0 40 20">
        <path
          d="M0,10 Q10,0 20,10 Q30,0 40,10"
          stroke={accent}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}