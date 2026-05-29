import "./App.css";
import {
  Search,
  Filter,
  ChevronDown,
  Upload,
} from "lucide-react";

function App() {
  const invoices = [
    {
      sn: "01",
      id: "#00234",
      amount: "₦3,000,000",
      date: "12 Jan 2025",
      status: "Active",
    },
  ];

  return (
    <div className="app">
      

      {/* PAGE */}
      <main className="container">
        <h1 className="page-title">Invoices</h1>

        {/* UPLOAD CARD */}
        <div className="upload-wrapper">
          <div className="upload-card">
            <div className="upload-icon">
              <Upload size={28} />
            </div>

            <h2>Upload Invoice</h2>
          </div>
        </div>

        {/* TABLE SECTION */}
        <section className="invoice-section">
          <div className="invoice-header">
            <div>
              <h2>Your Invoices</h2>

              <div className="tabs">
                <button className="tab active">Pending</button>
                <button className="tab">Funded</button>
                <button className="tab">Rejected</button>
              </div>
            </div>

            <div className="header-actions">
              <button className="filter-btn">
                <Filter size={20} />
                <span>Filter</span>
                <ChevronDown size={18} />
              </button>

              <div className="search-box">
                <Search size={20} />
                <input type="text" placeholder="Search" />
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Invoice ID</th>
                  <th>Invoice Amount</th>
                  <th>Submitted On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((item, index) => (
                  <tr key={index}>
                    <td>{item.sn}</td>
                    <td>{item.id}</td>
                    <td>{item.amount}</td>
                    <td>{item.date}</td>

                    <td>
                      <span className="status">{item.status}</span>
                    </td>

                    <td>
                      <button className="view-btn">
                        View Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;