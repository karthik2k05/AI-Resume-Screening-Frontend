import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Users,
  Briefcase,
  CalendarClock,
  Award,
} from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";

export default function AnalyticsHR({ darkMode }) {

  const cardBg = darkMode
    ? "bg-slate-900 border-slate-800"
    : "bg-white border-slate-200";

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(

          `${import.meta.env.VITE_API_URL}/api/hr/analytics`,

          {

            headers:{

              Authorization:`Bearer ${token}`

            }

          }

        );

        setAnalytics(response.data);

      }

      catch(error){

        console.error(error);

      }

    };

    fetchAnalytics();

  }, []);

  const colors=[
    "#2563eb",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#06b6d4"
  ];

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">

          HR Analytics

        </h1>

        <p
          className={`mt-2 ${
            darkMode
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >

          Recruitment insights and hiring pipeline.

        </p>

      </div>

      {/* KPI */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <StatCard
          darkMode={darkMode}
          icon={Users}
          tint="bg-blue-600"
          label="Applicants"
          value={analytics?.statistics.totalApplicants ?? 0}
        />

        <StatCard
          darkMode={darkMode}
          icon={Briefcase}
          tint="bg-emerald-600"
          label="Active Jobs"
          value={analytics?.statistics.activeJobs ?? 0}
        />

        <StatCard
          darkMode={darkMode}
          icon={CalendarClock}
          tint="bg-indigo-600"
          label="Interviews"
          value={analytics?.statistics.interviews ?? 0}
        />

        <StatCard
          darkMode={darkMode}
          icon={Award}
          tint="bg-amber-500"
          label="Average ATS"
          value={`${analytics?.statistics.averageATS ?? 0}%`}
        />

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Monthly Applicants */}

        <div className={`rounded-2xl border p-6 ${cardBg}`}>

          <h3 className="font-semibold mb-4">

            Monthly Applicants

          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart
              data={analytics?.monthlyApplicants ?? []}
            >

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="month"/>

              <YAxis/>

              <Tooltip/>

              <Bar
                dataKey="applicants"
                fill="#2563eb"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Hiring Funnel */}

        <div className={`rounded-2xl border p-6 ${cardBg}`}>

          <h3 className="font-semibold mb-4">

            Hiring Funnel

          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={analytics?.hiringFunnel ?? []}
                dataKey="count"
                nameKey="status"
                outerRadius={110}
                label
              >

                {(analytics?.hiringFunnel ?? []).map((item,index)=>(

                  <Cell

                    key={index}

                    fill={colors[index % colors.length]}

                  />

                ))}

              </Pie>

              <Tooltip/>

              <Legend/>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Department */}

        <div className={`rounded-2xl border p-6 ${cardBg}`}>

          <h3 className="font-semibold mb-4">

            Applications by Department

          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart
              data={analytics?.departmentApplications ?? []}
            >

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="department"/>

              <YAxis/>

              <Tooltip/>

              <Bar
                dataKey="applicants"
                fill="#10b981"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Top Jobs */}

        <div className={`rounded-2xl border p-6 ${cardBg}`}>

          <h3 className="font-semibold mb-4">

            Top Jobs

          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart
              data={analytics?.topJobs ?? []}
            >

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis
                dataKey="title"
                interval={0}
                angle={-20}
                textAnchor="end"
                height={70}
              />

              <YAxis/>

              <Tooltip/>

              <Bar
                dataKey="applicants"
                fill="#f59e0b"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}