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

//newly added
  const isUnlimited = subscription?.uploads_limit === -1;

  const usagePercent =
    subscription && !isUnlimited && subscription.uploads_limit
      ? Math.min(100, Math.round((subscription.uploads_used / subscription.uploads_limit) * 100))
      : 0;

  const remainingUploads = subscription
    ? isUnlimited
      ? "∞"
      : Math.max(0, subscription.uploads_limit - subscription.uploads_used)
    : "—";

  return (
  <div className="max-w-7xl mx-auto">

  {/* ================= CURRENT SUBSCRIPTION ================= */}
  <div
    className={`rounded-3xl border overflow-hidden mb-16 shadow-sm ${
  darkMode
    ? "bg-slate-900 border-slate-700"
    : "bg-white border-slate-200"
}`}
  >

    {/* HEADER */}
    <div
      className={`px-8 py-7 border-b ${
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
            className={`mt-2 text-sm ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Manage your ResumeIQ AI subscription and usage.
          </p>
        </div>

        {/* ACTIVE STATUS */}
        <span
          className="inline-flex items-center gap-2 px-5 py-2.5
                     rounded-full bg-green-500/10
                     text-green-500 border border-green-500/20
                     text-sm font-semibold"
        >
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          ACTIVE
        </span>

      </div>
    </div>


    {/* SUBSCRIPTION CONTENT */}
    <div className="p-8">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ================= CURRENT PLAN ================= */}
        <div
          className={`rounded-2xl border p-6 ${
            darkMode
    ? "bg-slate-900 border-slate-700"
    : "bg-white border-slate-200"
          }`}
        >

          <p
            className={`text-sm font-medium ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Current Plan
          </p>

          <h3
            className={`text-4xl font-bold mt-3 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {subscription?.plan || "FREE"}
          </h3>

          <div
            className="inline-flex items-center mt-5 px-4 py-2
                       rounded-full bg-blue-500/10
                       text-blue-500 text-sm font-medium"
          >
            {subscription?.plan === "FREE"
              ? "10 Resume Uploads Included"
              : "Unlimited Resume Uploads"}
          </div>

        </div>


        {/* ================= UPLOAD USAGE ================= */}
        <div
          className={`rounded-2xl border p-6 ${
            darkMode
    ? "bg-slate-900 border-slate-700"
    : "bg-white border-slate-200"
          }`}
        >

          <div className="flex items-center justify-between">

            <p
              className={`text-sm font-medium ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Upload Usage
            </p>

            <span className="text-xs font-semibold text-blue-500">
              {isUnlimited ? "UNLIMITED" : `${usagePercent}% USED`}
            </span>

          </div>

          <h3
            className={`text-4xl font-bold mt-3 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {isUnlimited
              ? "Unlimited"
              : `${subscription?.uploads_used ?? 0} / ${
                  subscription?.uploads_limit ?? 10
                }`}
          </h3>

          {/* PROGRESS BAR */}
          <div
            className={`w-full h-3 rounded-full mt-6 overflow-hidden ${
              darkMode ? "bg-slate-700" : "bg-slate-200"
            }`}
          >
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{
                width: isUnlimited ? "100%" : `${usagePercent}%`,
              }}
            />
          </div>

          <p
            className={`text-sm mt-3 ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {isUnlimited
              ? "Unlimited plan"
              : `${usagePercent}% Used`}
          </p>

        </div>


        {/* ================= REMAINING UPLOADS ================= */}
        <div
          className={`rounded-2xl border p-6 ${
            darkMode
    ? "bg-slate-900 border-slate-700"
    : "bg-white border-slate-200"
          }`}
        >

          <p
            className={`text-sm font-medium ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Remaining Uploads
          </p>

          <h3 className="text-4xl font-bold mt-3 text-blue-500">
            {remainingUploads}
          </h3>

          <p
            className={`text-sm mt-2 ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Available in your current plan
          </p>

          <button
            onClick={() => upgradePlan("MONTHLY")}
            className="mt-5 px-6 py-3 rounded-xl
                       bg-blue-600 hover:bg-blue-700
                       text-white font-medium
                       transition-all duration-200
                       shadow-sm hover:shadow-md"
          >
            Upgrade Now
          </button>

        </div>

      </div>


      {/* ================= PLAN BENEFITS ================= */}
      <div
        className={`mt-8 rounded-2xl border p-6 ${
          darkMode
    ? "bg-slate-900 border-slate-700"
    : "bg-white border-slate-200"
        }`}
      >

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              What's included in your plan?
            </h3>

            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Get more from ResumeIQ AI with your current subscription.
            </p>

          </div>


          {/* FEATURES */}
<div className="flex flex-wrap gap-3">

  <div
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl
      border text-sm font-medium
      ${
        darkMode
          ? "bg-slate-800 border-slate-700 text-slate-200"
          : "bg-white border-slate-200 text-slate-700 shadow-sm"
      }`}
  >
    <span
      className={`flex items-center justify-center w-5 h-5 rounded-full
        text-xs font-bold
        ${
          darkMode
            ? "bg-blue-500/20 text-blue-400"
            : "bg-blue-50 text-blue-600"
        }`}
    >
      ✓
    </span>

    AI Resume Screening
  </div>


  <div
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl
      border text-sm font-medium
      ${
        darkMode
          ? "bg-slate-800 border-slate-700 text-slate-200"
          : "bg-white border-slate-200 text-slate-700 shadow-sm"
      }`}
  >
    <span
      className={`flex items-center justify-center w-5 h-5 rounded-full
        text-xs font-bold
        ${
          darkMode
            ? "bg-blue-500/20 text-blue-400"
            : "bg-blue-50 text-blue-600"
        }`}
    >
      ✓
    </span>

    Job Matching
  </div>


  <div
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl
      border text-sm font-medium
      ${
        darkMode
          ? "bg-slate-800 border-slate-700 text-slate-200"
          : "bg-white border-slate-200 text-slate-700 shadow-sm"
      }`}
  >
    <span
      className={`flex items-center justify-center w-5 h-5 rounded-full
        text-xs font-bold
        ${
          darkMode
            ? "bg-blue-500/20 text-blue-400"
            : "bg-blue-50 text-blue-600"
        }`}
    >
      ✓
    </span>

    Resume Management
  </div>

</div>

        </div>

      </div>

    </div>

  </div>


  {/* YOUR EXISTING PRICING PLANS SECTION
      STARTS AFTER THIS */}

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