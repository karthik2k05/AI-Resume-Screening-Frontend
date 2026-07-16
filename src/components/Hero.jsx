import {
  ArrowRight,
  Sparkles,
  BadgeCheck,
  Brain,
  FileText,
  ScanSearch,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Hero({ darkMode }) {
  return (
    <section
      className={`relative overflow-hidden ${
        darkMode
          ? "bg-slate-950"
          : "bg-gradient-to-br from-slate-50 via-white to-blue-50"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[130px]" />
        <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-5 gap-10 lg:gap-14 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:col-span-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              <Sparkles size={16} />
              Intelligent Recruitment Platform
            </span>

            <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Transform Hiring
              <br />
              with
              <span className="text-blue-600"> ResumeIQ AI</span>
            </h1>

            <p
              className={`mt-8 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Streamline your recruitment process with AI-powered
              resume screening, intelligent candidate ranking,
              automated skill extraction and real-time hiring
              insights—all within one secure platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0">
                Start Free Trial
                <ArrowRight size={18} />
              </button>

              <button
                className={`rounded-xl border px-7 py-3 font-semibold transition hover:-translate-y-0.5 active:translate-y-0 ${
                  darkMode
                    ? "border-slate-700 hover:bg-slate-900"
                    : "border-slate-300 hover:bg-slate-100"
                }`}
              >
                Learn More
              </button>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5">
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-blue-600 shrink-0" size={18} />
                <span className="text-sm sm:text-base">AI Resume Screening</span>
              </div>
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-blue-600 shrink-0" size={18} />
                <span className="text-sm sm:text-base">Candidate Ranking</span>
              </div>
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-blue-600 shrink-0" size={18} />
                <span className="text-sm sm:text-base">ATS Compatible</span>
              </div>
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-blue-600 shrink-0" size={18} />
                <span className="text-sm sm:text-base">Recruitment Analytics</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="md:col-span-2"
          >
            <div
              className={`relative mx-auto w-full max-w-[430px] rounded-[32px] border shadow-2xl overflow-hidden ${
                darkMode
                  ? "bg-slate-900 border-slate-700"
                  : "bg-white border-slate-200"
              }`}
            >
              {/* Header */}
              <div
                className={`px-6 py-5 border-b ${
                  darkMode ? "border-slate-700" : "border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">ResumeIQ AI</p>
                    <h3 className="text-xl font-bold mt-1">
                      AI Recruitment Assistant
                    </h3>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <Brain size={22} />
                  </div>
                </div>
              </div>

              {/* Workflow */}
              <div className="p-6 space-y-5">
                {/* Resume */}
                <div
                  className={`rounded-2xl border p-4 transition hover:shadow-lg ${
                    darkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <FileText size={22} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Resume Uploaded</h4>
                      <p className="text-sm text-slate-500">
                        Senior_Frontend_Developer.pdf
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI */}
                <div
                  className={`rounded-2xl border p-4 transition hover:shadow-lg ${
                    darkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <ScanSearch size={22} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">AI Skill Analysis</h4>
                      <p className="text-sm text-slate-500">
                        Skills identified successfully
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                      React
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                      Python
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                      SQL
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                      AWS
                    </span>
                  </div>
                </div>

                {/* Score */}
                <div
                  className={`rounded-2xl border p-5 ${
                    darkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">AI Match Score</span>
                    <span className="font-bold text-blue-600">94%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-300 mt-4">
                    <div className="h-2 w-[94%] rounded-full bg-blue-600"></div>
                  </div>
                </div>

                {/* Final */}
                <div
                  className={`rounded-2xl border p-4 ${
                    darkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                      <UserCheck size={22} />
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Candidate Shortlisted
                      </h4>
                      <p className="text-sm text-slate-500">
                        Ready for Interview
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* End Right */}
        </div>
      </div>
    </section>
  );
}
