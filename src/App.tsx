import { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import Invoices from "./pages/Invoices/Invoices";
import Offers from "./pages/Offers/Offers";
import Navbar from "./components/common/Navbar/Navbar";

type Page = "home" | "invoices" | "offers";

type MessageEventData = {
  type: "TEST_DATA" | string;
  value?: unknown;
};

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<MessageEventData>) => {
      console.log("EVENT:", event);

      if (event.origin !== "http://localhost:5174") return;
      if (!event.data) return;

      switch (event.data.type) {
        case "TEST_DATA":
          console.log("GOT DATA:", event.data.value);
          setData(event.data.value);
          break;

        default:
          break;
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="af-app">
      <div className="af-page-card">
        <Navbar page={page} setPage={setPage} />

        <div className="af-page-body">
          {page === "home" && <Home />}
          {page === "invoices" && <Invoices />}
          {page === "offers" && <Offers />}
        </div>
      </div>
    </div>
  );
}