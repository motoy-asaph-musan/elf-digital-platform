import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentStatusModal({ reference, onComplete }: { reference: string, onComplete: () => void }) {
  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
    // Poll the backend every 3 seconds to check if the Webhook has updated the DB
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`https://api.yourdomain.com/payments/status/${reference}`);
        if (res.data.status === "SUCCESS") {
          setStatus("SUCCESS");
          clearInterval(interval);
          setTimeout(onComplete, 2000); // Close modal after showing success
        } else if (res.data.status === "FAILED") {
          setStatus("FAILED");
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Polling error", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [reference]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {status === "PENDING" && <p>🔄 Waiting for your MoMo/Airtel PIN entry...</p>}
        {status === "SUCCESS" && <p>✅ Payment Successful! Redirecting...</p>}
        {status === "FAILED" && <p>❌ Payment Failed. Please try again.</p>}
      </div>
    </div>
  );
}