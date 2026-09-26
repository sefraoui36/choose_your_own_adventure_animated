export default function Aurora({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 600, height: 200 }}>
      <svg viewBox="0 0 600 200">
        <path
          d="M0,150 Q150,60 300,120 T600,80"
          stroke={accent}
          strokeWidth="30"
          fill="none"
          opacity="0.35"
        />
        <path
          d="M0,180 Q150,100 300,150 T600,120"
          stroke={accent}
          strokeWidth="20"
          fill="none"
          opacity="0.25"
        />
      </svg>
    </div>
  );
}