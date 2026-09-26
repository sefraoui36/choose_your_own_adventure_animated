export default function Skyscraper({ palette }) {
  const { ground, accent } = palette;
  return (
    <div className="part" style={{ width: 100, height: 260 }}>
      <svg viewBox="0 0 100 260">
        <rect x="20" y="20" width="60" height="240" fill={ground} />
        {[...Array(10)].map((_, i) => (
          <rect key={`l${i}`} x="28" y={30 + i * 22} width="10" height="12" fill={accent} opacity="0.8" />
        ))}
        {[...Array(10)].map((_, i) => (
          <rect key={`r${i}`} x="62" y={30 + i * 22} width="10" height="12" fill={accent} opacity="0.8" />
        ))}
      </svg>
    </div>
  );
}