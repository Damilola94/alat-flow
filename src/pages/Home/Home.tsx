import StatsGrid from "../../components/common/StatsGrid/StatsGrid";
import CompanyPill from "../../components/common/CompanyPill/CompanyPill";
import InvoiceCard from "../../components/common/InvoiceCard/InvoiceCard";
import moneyBg from "../../assets/background/money.png";

import "./Home.css";
import NotificationPanel from "../../components/common/Notification/NotificationPanel";
import { Invoice } from "../../components/common/InvoiceCard/type";

const FUNDED_INVOICES: Invoice[] = [
  {
    id: "#00234",
    amount: "₦300,000",
    due: "Due: 16 May, 2025",
    variant: "pink",
  },
  {
    id: "#00235",
    amount: "₦300,000",
    due: "Due: 16 May, 2025",
    variant: "pink",
  },
  {
    id: "#00236",
    amount: "₦300,000",
    due: "Due: 16 May, 2025",
    variant: "pink",
  },
];

const FUNDING_OFFERS: Invoice[] = [
  {
    id: "#00234",
    amount: "₦300,000",
    badge: "90% Advance | Fee 2%",
    variant: "purple",
  },
  {
    id: "#00235",
    amount: "₦300,000",
    badge: "90% Advance | Fee 2%",
    variant: "purple",
  },
  {
    id: "#00236",
    amount: "₦300,000",
    badge: "90% Advance | Fee 2%",
    variant: "purple",
  },
];

export default function Home() {
  return (
    <div className="home-page">
      <div className="fund-banner-background">
        <div className="fund-banner">
          <div className="fund-banner__text">
            <h3>Turn unpaid invoices into instant liquidity</h3>
            <button className="fund-banner__btn">Request Funding</button>
          </div>

          <div className="fund-banner__img" aria-hidden="true">
            <img src={moneyBg} alt="" />
          </div>
        </div>
      </div>

      <div className="home-content">
        <div className="home-content__left">
          <div className="home-section">
            <div className="inv-card-background">
              <div className="home-section__hdr">
                <h4>Funded Invoice</h4>
                <span className="view-all">View all</span>
              </div>

              <div className="inv-grid">
                {FUNDED_INVOICES.map((inv) => (
                  <InvoiceCard key={inv.id} {...inv} />
                ))}
              </div>
            </div>
          </div>

          <div className="home-section">
            <div className="inv-card-background">
              <div className="home-section__hdr">
                <h4>Funding Offers</h4>
                <span className="view-all">View all</span>
              </div>

              <div className="inv-grid">
                {FUNDING_OFFERS.map((inv) => (
                  <InvoiceCard key={inv.id} {...inv} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <NotificationPanel />
      </div>
    </div>
  );
}