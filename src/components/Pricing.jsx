import { motion } from "framer-motion";

const plans = [
  {
    title: "Free Trial",
    price: "₹0",
    period: "7 Days",
    features: [
      "50 Resume Uploads",
      "Basic AI Screening",
      "Email Support",
    ],
    button: "Start Free",
    popular: false,
  },
  {
    title: "Professional",
    price: "₹999",
    period: "/ Month",
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
    price: "Custom",
    period: "",
    features: [
      "Unlimited Everything",
      "API Integration",
      "Dedicated Support",
    ],
    button: "Contact Sales",
    popular: false,
  },
];

export default function Pricing({ darkMode }) {
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
            className={`relative rounded-2xl border p-6 sm:p-8 transition-all duration-300
            hover:-translate-y-2 hover:shadow-2xl
            ${
              plan.popular
                ? "border-blue-600"
                : darkMode
                ? "border-slate-700"
                : "border-slate-200"
            }
            ${
              darkMode
                ? "bg-slate-900"
                : "bg-white"
            }`}
          >

            {plan.popular && (

              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </span>

            )}

            <h3 className="text-xl sm:text-2xl font-bold mt-4">
              {plan.title}
            </h3>

            <h1 className="text-4xl sm:text-5xl font-bold mt-6">
              {plan.price}
            </h1>

            <p className="text-slate-500 mt-2">
              {plan.period}
            </p>

            <ul className="mt-8 space-y-3">

              {plan.features.map((item) => (
                <li key={item}>
                  ✓ {item}
                </li>
              ))}

            </ul>

            <button className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">

              {plan.button}

            </button>

          </motion.div>

        ))}

      </div>

    </section>
  );
}
