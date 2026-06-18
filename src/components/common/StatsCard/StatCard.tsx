import "./StatCard.css";

interface StatCardProps {
  value: string | number;
  label: string;
  variant?: "s1" | "s2" | "s3";
}

export default function StatCard({
  value,
  label,
  variant = "s1",
}: StatCardProps) {
  return (
    <div className={`stat-card ${variant}`}>
      <div className="stat-card__bg" aria-hidden="true" />
      <div className="stat-card__content">
        <h2 className="stat-card__value">{value}</h2>
        <p className="stat-card__label">{label}</p>
      </div>
    </div>
  );
}