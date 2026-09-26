export default function TreeDead({ palette }) {
  const { ground } = palette;
  return (
    <div className="part" style={{ width: 100, height: 170 }}>
      <svg viewBox="0 0 100 170">
        <path
          d="M50,170 L50,60 M50,100 L25,70 M50,90 L75,60 M50,70 L30,40"
          stroke={ground}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}