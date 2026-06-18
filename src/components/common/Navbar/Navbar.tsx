import CompanyPill from "../CompanyPill/CompanyPill";
import StatsGrid from "../StatsGrid/StatsGrid";
import "./Navbar.css";

type Page = "home" | "invoices" | "offers";

interface NavbarProps {
  page: Page;
  setPage: (page: Page) => void;
}

export default function Navbar({ page, setPage }: NavbarProps) {
  const tabs = [
    { id: "home", label: "Homepage" },
    { id: "invoices", label: "Invoices" },
    { id: "offers", label: "Offers" },
  ] as const;

  return (
    <div className="af-navbar-wrap">
      <nav className="af-navbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`af-navbar__tab ${page === tab.id ? "active" : ""}`}
            onClick={() => setPage(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {page === "home" && (
        <div className="af-navbar-home">
          <CompanyPill name="Progress Seafood Nig. LTD" />

          <StatsGrid
            stats={[
              {
                value: "₦9.2M",
                label: "Funded Invoices",
                variant: "s1",
              },
              {
                value: "₦3.5M",
                label: "Pending Invoices",
                variant: "s2",
              },
              {
                value: "03",
                label: "Pending Offers",
                variant: "s3",
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}