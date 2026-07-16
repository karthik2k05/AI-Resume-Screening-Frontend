import {
  Sparkles,
  ScanSearch,
  ChartColumn,
  Plug,
  ChartLine,
  ShieldCheck,
  BellRing,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI Resume Screening",
    desc: "Automatically filters resumes using AI, surfacing the strongest candidates first.",
    icon: ScanSearch,
  },
  {
    title: "Candidate Ranking",
    desc: "Ranks applicants against job requirements so recruiters know who to call first.",
    icon: ChartColumn,
  },
  {
    title: "ATS Compatible",
    desc: "Plugs into the ATS platforms you already use, no migration required.",
    icon: Plug,
  },
  {
    title: "Analytics",
    desc: "Track time-to-hire, funnel drop-off, and recruiter performance in one view.",
    icon: ChartLine,
  },
  {
    title: "Secure Storage",
    desc: "Enterprise-grade encryption keeps candidate data protected end to end.",
    icon: ShieldCheck,
  },
  {
    title: "Email Notifications",
    desc: "Keep recruiters and candidates informed the moment a stage changes.",
    icon: BellRing,
  },
];

export default function Features({ darkMode }) {
  return (
    <section
      id="features"
      className={`relative overflow-x-hidden py-16 md:py-24 ${
        darkMode ? "bg-slate-950" : "bg-slate-50/60"
      }`}
    >
      {/* Ambient background, consistent with Hero — capped so it never forces page width */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[300px] w-[90vw] max-w-[600px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <Sparkles size={16} />
            Platform Capabilities
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Why choose ResumeIQ AI?
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Powerful, connected tools that take recruitment from resume to
            hire.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-12 sm:mt-16">
          {features.map(({ title, desc, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.1 }}
              className={`group relative rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                darkMode
                  ? "bg-slate-900 border-slate-800 hover:border-blue-500/60 hover:shadow-blue-500/10"
                  : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-blue-500/10"
              }`}
            >
              {/* Accent bar that appears on hover */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-sm shadow-blue-600/30 group-hover:shadow-md group-hover:shadow-blue-600/40 transition-shadow">
                <Icon size={22} strokeWidth={2.25} />
              </div>

              <h3 className="text-lg sm:text-xl font-bold mt-6">{title}</h3>

              <p
                className={`mt-3 text-sm sm:text-base leading-relaxed ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
