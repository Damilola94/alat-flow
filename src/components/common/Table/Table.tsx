import "./Table.css";

interface TableRow {
  sn?: string;
  id: string;
  amount: string;
  discount?: string;
  date: string;
  status?: "Active" | "Closed";
}

interface TableProps {
  offers?: boolean;
  data?: TableRow[];
  onViewInvoice?: (row: TableRow) => void;
}

export default function Table({
  offers = false,
  data,
  onViewInvoice,
}: TableProps) {
  const rows: TableRow[] =
    data ||
    Array.from({ length: 8 }, (_, i) => ({
      sn: String(i + 1).padStart(2, "0"),
      id: "#00234",
      amount: "₦3,000,000",
      discount: `${90 - i * 5}%`,
      date: "02 Apr, 2025",
      status: i < 2 ? "Active" : "Closed",
    }));

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Invoice ID</th>
            <th>Invoice Amount</th>

            {offers && <th>Discount Offered</th>}

            <th>{offers ? "Date" : "Submitted On"}</th>

            {!offers && <th>Status</th>}

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={row.sn ?? i}>
              <td>{row.sn ?? String(i + 1).padStart(2, "00")}</td>
              <td>{row.id}</td>
              <td>{row.amount}</td>

              {offers && <td>{row.discount}</td>}

              <td>{row.date}</td>

              {!offers && (
                <td>
                  <span
                    className={`status-badge ${
                      row.status === "Active" ? "active" : "closed"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              )}

              <td>
                <button
                  className="outline-btn"
                  onClick={() => onViewInvoice?.(row)}
                >
                  {offers ? "View Offer" : "View Invoice"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button className="page-btn">Previous</button>

        {[1, 2, 3, 4, 10].map((p) => (
          <button
            key={p}
            className={`page-btn ${p === 1 ? "page-active" : ""}`}
          >
            {p}
          </button>
        ))}

        <button className="page-btn">Next</button>
      </div>
    </div>
  );
}