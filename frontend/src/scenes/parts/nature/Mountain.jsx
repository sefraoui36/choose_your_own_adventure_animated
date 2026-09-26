export default function Mountain({ palette }) {
  const { ground, sky } = palette;
  return (
    <div className="part" style={{ width: 300, height: 200 }}>
      <svg viewBox="0 0 300 200">
        <path d="M10,200 L150,20 L290,200 Z" fill={ground} />
        <path d="M120,80 L150,20 L180,80 L160,70 L150,90 L140,70 Z" fill={sky} opacity="0.9" />
      </svg>
    </div>
  );
}