import React, { useState } from 'react';
import { initiateSubscription } from '../services/paymentService';

const Subscription = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (plan) => {
    setLoading(true);
    try {
      const result = await initiateSubscription(plan);
      // If mobile money, show "Check your phone for prompt"
      // If Visa, redirect to the provided payment URL
      alert(result.message);
    } catch (err) {
      alert("Payment failed to initialize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-grid">
      <div className="plan-card">
        <h3>School Basic</h3>
        <p>UGX 200,000 / Term</p>
        <button disabled={loading} onClick={() => handleSubscribe('SCHOOL_BASIC')}>
          Pay with MoMo
        </button>
      </div>
    </div>
  );
};