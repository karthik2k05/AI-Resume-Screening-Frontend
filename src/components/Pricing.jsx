import { motion } from "framer-motion";
import { useState } from "react";

import RoleSelectionModal from "./RoleSelectionModal";
const plans = [
  {
    title: "Free Trial",
    price: "₹0",
    period: "Limited",
    features: [
      "10 Resume Uploads",
      "AI Screening",
      "Job Matching",
    ],
    button: "Start Free",
    popular: false,
  },
  {
    title: "Professional",
    price: "₹499",
    period: " Monthly",
    features: [
      "Unlimited Screening",
      "AI Ranking",
      "Analytics Dashboard",
      "Priority Support",
    ],
    button: "Subscribe",
    popular: true,
  },
  {
    title: "Enterprise",
    price: "₹4999",
    period: " Yearly",
    features: [
      "Unlimited Screening",
      "AI Ranking",
      "Analytics Dashboard",
      "Dedicated Support",
      
    ],
    button: "Subscribe",
    popular: false,
  },
];

export default function Pricing({
  darkMode,
  dashboard = false,
  currentPlan = "FREE",
  onSubscribe = () => {},
}) {
   

  const [showRoleModal, setShowRoleModal] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState("");

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setShowRoleModal(true);
  };
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >

        <h2 className="text-3xl sm:text-4xl font-bold">
          Pricing Plans
        </h2>

        <p className={`mt-4 text-base sm:text-lg ${
          darkMode ? "text-slate-400" : "text-slate-600"
        }`}>
          Flexible plans for every organization.
        </p>

      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">

        {plans.map((plan, index) => (

          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}

            
            className={`relative rounded-2xl border p-6 sm:p-8 
transition-all duration-300 
hover:-translate-y-2 hover:shadow-2xl 
${
  plan.popular
    ? "border-blue-500 ring-2 ring-blue-500/20"
    : darkMode
    ? "border-slate-700"
    : "border-slate-200"
}
${
  darkMode
    ? "bg-slate-900 hover:bg-slate-800"
    : "bg-white hover:bg-slate-50"
}`}
          >

            {plan.popular && (

              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </span>

            )}

            <div className="flex items-center justify-between mt-4">
  <h3
    className={`text-xl sm:text-2xl font-bold ${
      darkMode ? "text-white" : "text-slate-900"
    }`}
  >
    {plan.title}
  </h3>

  {plan.title === "Free Trial" && (
    <span className="text-xs px-3 py-1 rounded-full bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
      Starter
    </span>
  )}

  {plan.title === "Professional" && (
    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
      Recommended
    </span>
  )}

  {plan.title === "Enterprise" && (
    <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
      Premium
    </span>
  )}
</div>

            <div className="mt-6 flex items-baseline gap-2">
  <h1
    className={`text-4xl sm:text-5xl font-bold ${
      darkMode ? "text-white" : "text-slate-900"
    }`}
  >
    {plan.price}
  </h1>

  <span
    className={`text-sm sm:text-base ${
      darkMode ? "text-slate-400" : "text-slate-500"
    }`}
  >
    /{plan.period.trim().toLowerCase()}
  </span>
</div>

            <ul className="mt-8 space-y-4">
  {plan.features.map((item) => (
    <li
      key={item}
      className={`flex items-center gap-3 text-sm sm:text-base ${
        darkMode ? "text-slate-300" : "text-slate-600"
      }`}
    >
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10 text-green-500 font-bold">
        ✓
      </span>

      <span>{item}</span>
    </li>
  ))}
</ul>
          <button
  onClick={() => {
    if (dashboard) {
      onSubscribe(plan);
    } else {
      handlePlanClick(plan.title);
    }
  }}
  disabled={
    dashboard &&
    (
      (currentPlan === "FREE" && plan.title === "Free Trial") ||
      (currentPlan === "MONTHLY" && plan.title === "Professional") ||
      (currentPlan === "YEARLY" && plan.title === "Enterprise")
    )
  }
  className={`w-full mt-10 py-3 rounded-lg transition
    ${
      dashboard &&
      (
        (currentPlan === "FREE" && plan.title === "Free Trial") ||
        (currentPlan === "MONTHLY" && plan.title === "Professional") ||
        (currentPlan === "YEARLY" && plan.title === "Enterprise")
      )
        ? "bg-green-600 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
    text-white`}
>
  {dashboard &&
  (
    (currentPlan === "FREE" && plan.title === "Free Trial") ||
    (currentPlan === "MONTHLY" && plan.title === "Professional") ||
    (currentPlan === "YEARLY" && plan.title === "Enterprise")
  )
    ? "Current Plan"
    : plan.button
    }
</button>

          </motion.div>

        ))}

      </div>

<RoleSelectionModal
  open={showRoleModal}
  selectedPlan={selectedPlan}
  onClose={() => setShowRoleModal(false)}
  darkMode={darkMode}
/>
    </section>
  );
}