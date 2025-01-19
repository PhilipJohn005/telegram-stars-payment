import React, { useState } from "react";
import { WebApp } from "@twa-dev/sdk"; // Telegram WebApp SDK
import { apiGetLink } from "./api";

function App() {
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePayment = async () => {
    try {
      const response = await apiGetLink();
      WebApp.openInvoice(response.invoiceLink, (status) => {
        if (status === "paid") {
          setPaymentStatus("Payment successful!");
        } else {
          setPaymentStatus("Payment failed or canceled.");
        }
      });
    } catch (error) {
      console.error(error);
      setPaymentStatus("Error initiating payment.");
    }
  };

  return (
    <div>
      <h1>Telegram Stars Payment Integration</h1>
      <button onClick={handlePayment}>Pay Now</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
}

export default App;
