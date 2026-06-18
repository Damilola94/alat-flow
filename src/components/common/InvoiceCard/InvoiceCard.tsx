import "./InvoiceCard.css";
import offer from "../../../assets/money/offer.png";
import invoice from "../../../assets/money/invoice.png";
import { Invoice } from "./type";


export default function InvoiceCard({
  id,
  amount,
  due,
  badge,
  variant = "pink",
}: Invoice) {
  const cardImage = variant === "pink" ? invoice : offer;

  return (
    <div className="inv-card-backgrounsd">
      <div className={`inv-card ${variant}`}>
        <div className="inv-card__thumb">
          <img src={cardImage} alt="Invoice" />
        </div>

        <div className="inv-card__info">
          <span className="inv-card__id">{id}</span>
          <span className="inv-card__amount">{amount}</span>

          {due && <span className="inv-card__due">{due}</span>}
          {badge && <span className="inv-card__badge">{badge}</span>}
        </div>
      </div>
    </div>
  );
}