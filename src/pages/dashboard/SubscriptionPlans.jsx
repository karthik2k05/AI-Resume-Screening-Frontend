import { useEffect, useState } from "react";
import { useLocation,useNavigate,   useOutletContext,  } from "react-router-dom";
import axios from "axios";
import Pricing from "../../components/Pricing";


export default function SubscriptionPlans() {
    const navigate = useNavigate();

const location = useLocation();

const { darkMode } = useOutletContext();


  const selectedPlan = location.state?.selectedPlan;

  const [loading, setLoading] = useState(false);

  const upgradePlan = async (plan) => {
    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/subscription/upgrade`,
        { plan },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(`${plan} Subscription Activated!`);

await fetchSubscription();

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Subscription failed."
      );
    } finally {
      setLoading(false);
    }
  };
const fetchSubscription = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/subscription/current`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setSubscription(res.data.subscription);

  } catch (err) {
    console.error(err);
  }
};
 useEffect(() => {

  fetchSubscription();

  if (selectedPlan === "Professional") {
    upgradePlan("MONTHLY");
  }

  if (selectedPlan === "Enterprise") {
    upgradePlan("YEARLY");
  }

}, []);
const [subscription, setSubscription] = useState(null);
  return (
  <div className="max-w-7xl mx-auto">
   <div
  className={`rounded-3xl border p-8 mb-16 ${
    darkMode
      ? "bg-slate-900 border-slate-700"
      : "bg-white border-slate-200"
  }`}
>
  <div className="flex items-center justify-between">

    <div>
      <h2
        className={`text-3xl font-bold ${
          darkMode ? "text-white" : "text-slate-900"
        }`}
      >
        Current Subscription
      </h2>

      <p
        className={`mt-2 ${
          darkMode ? "text-slate-400" : "text-slate-600"
        }`}
      >
        Manage your ResumeIQ AI subscription.
      </p>
    </div>

    <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-semibold">
      ACTIVE
    </span>

  </div>

  <div className="grid md:grid-cols-3 gap-10 mt-10">

    {/* PLAN */}

    <div>

      <p className="text-slate-400">
        Current Plan
      </p>

      <h3
        className={`text-4xl font-bold mt-2 ${
          darkMode ? "text-white" : "text-slate-900"
        }`}
      >
        {subscription?.plan || "FREE"}
      </h3>

      <span className="inline-block mt-4 px-4 py-1 rounded-full bg-blue-500/20 text-blue-400">
  {subscription?.plan === "FREE"
    ? "10 Resume Uploads Included"
    : "Unlimited Resume Uploads"}
</span>

    </div>

    {/* UPLOADS */}

    <div>

      <p className="text-slate-400">
        Upload Usage
      </p>

      <h3
        className={`text-4xl font-bold mt-2 ${
          darkMode ? "text-white" : "text-slate-900"
        }`}
      >
        {subscription?.uploads_used} / {subscription?.uploads_limit}
      </h3>

      <div className="w-full h-3 rounded-full bg-slate-700 mt-5">

        <div
          className="bg-blue-600 h-3 rounded-full"
          style={{
width: subscription
? `${(subscription.uploads_used / subscription.uploads_limit) * 100}%`
: "0%",
}}
        />

      </div>

      <p className="text-slate-400 mt-3">
        {subscription
? `${Math.round(
(subscription.uploads_used /
subscription.uploads_limit) *
100
)}% Used`
: "0% Used"}
      </p>

    </div>

    {/* REMAINING */}

    <div>

      <p className="text-slate-400">
        Remaining Uploads
      </p>

      <h3 className="text-4xl font-bold mt-2 text-blue-500">
        {subscription
  ? subscription.uploads_limit - subscription.uploads_used
  : 0}
      </h3>

      <button
        onClick={() => upgradePlan("MONTHLY")}
        className="mt-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
      >
        Upgrade Now
      </button>

    </div>

  </div>

</div>

    <Pricing
      darkMode={darkMode}
      dashboard={true}
      currentPlan={subscription?.plan || "FREE"}
     onSubscribe={async (plan) => {

  let selectedPlan = "";

  if (plan.title === "Professional") {
    selectedPlan = "MONTHLY";
  }

  if (plan.title === "Enterprise") {
    selectedPlan = "YEARLY";
  }

  if (!selectedPlan) return;

  await upgradePlan(selectedPlan);

}}
    />

  </div>
);
  
}