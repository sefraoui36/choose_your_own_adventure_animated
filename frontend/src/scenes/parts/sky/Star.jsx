export default function Star({ palette }) {
  const { accent } = palette;
  return (
    <div className="part" style={{ width: 20, height: 20 }}>
      <svg viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="2" fill={accent} />
      </svg>
    </div>
  );
}