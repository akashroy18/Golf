import { useState } from "react";
import { createOrder, verifyPayment } from "../api/payment.api";
import { useAuth } from "../context/AuthContext";

const Payment = () => {
  const [plan, setPlan] = useState("monthly");

  const { user, updateUser } = useAuth(); // ✅ FIXED

  const isActive =
    user?.isSubscribed &&
    new Date(user.subscriptionEndDate) > new Date();

  const handlePayment = async () => {
    if (isActive) {
      alert("You already have an active subscription");
      return;
    }

    try {
      const { data } = await createOrder({ plan });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Golf Platform",
        description: plan + " subscription",
        order_id: data.order.id,

        handler: async function (response) {
          const res = await verifyPayment({
            ...response,
            plan,
          });

          updateUser(res.data.user);

          alert("Payment successful");
          window.location.href = "/dashboard";
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment failed");
    }
  };

  return (
    <div className="container">
      <h2>Select Subscription Plan</h2>

      <label>
        <input
          type="radio"
          checked={plan === "monthly"}
          onChange={() => setPlan("monthly")}
        />
        Monthly - ₹100
      </label>

      <br />

      <label>
        <input
          type="radio"
          checked={plan === "yearly"}
          onChange={() => setPlan("yearly")}
        />
        Yearly - ₹1000
      </label>

      <br /><br />

      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;