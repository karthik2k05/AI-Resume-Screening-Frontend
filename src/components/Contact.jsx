import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { motion } from "framer-motion";

const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: "Email us",
    value: "hello@resumeiq.ai",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+1 (555) 012-4567",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "500 Market St, San Francisco, CA",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 1 business day",
  },
];

export default function Contact({ darkMode }) {
  const inputClasses = `w-full rounded-lg px-4 py-3 text-sm outline-none border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
    darkMode
      ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
      : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
  }`;

  return (
    <section
      id="contact"
      className={`py-16 md:py-24 ${darkMode ? "bg-slate-950" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <Mail size={16} />
            Get in Touch
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Let's talk hiring
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Questions about ResumeIQ AI? Our team replies fast.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 mt-14">
          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-2 space-y-4"
          >
            {CONTACT_DETAILS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className={`flex items-start gap-4 rounded-2xl border p-5 ${
                  darkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-sm shadow-blue-600/30">
                  <Icon size={19} strokeWidth={2.25} />
                </div>
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-wide ${
                      darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {label}
                  </p>
                  <p className="mt-1 font-medium">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className={`lg:col-span-3 rounded-2xl border p-6 sm:p-10 ${
              darkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200 shadow-lg"
            }`}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="fullName"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  placeholder="Jane Cooper"
                  className={inputClasses}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Tell us a bit about your hiring needs..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-sm shadow-blue-600/30 hover:shadow-md hover:shadow-blue-600/40 transition-all"
            >
              Send Message
              <Send size={16} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
