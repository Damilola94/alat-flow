import "./CompanyPill.css";

interface CompanyPillProps {
  name: string;
}

export default function CompanyPill({ name }: CompanyPillProps) {
  return (
    <div className="company-pill">
      <div className="company-pill__avatar">PS</div>
      <span className="company-pill__name">{name}</span>
      <span className="company-pill__chevron">▾</span>
    </div>
  );
}