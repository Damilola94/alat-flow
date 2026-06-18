import StatCard from "../StatsCard/StatCard";
import "./StatsGrid.css";

interface StatItem {
  value: string | number;
  label: string;
  variant?: "s1" | "s2" | "s3";
}

interface StatsGridProps {
  stats: StatItem[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="stats-grid">
      {stats.map((s, i) => (
        <StatCard
          key={i}
          value={s.value}
          label={s.label}
          variant={s.variant}
        />
      ))}
    </div>
  );
}