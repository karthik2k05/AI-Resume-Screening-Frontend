import { useOutletContext } from "react-router-dom";
import AdminOverviewSummary from "./AdminOverviewSummary";
import CandidateOverviewSummary from "./CandidateOverviewSummary";
import HROverviewSummary from "./HROverviewSummary";

export default function Overview() {
  const { darkMode, role } = useOutletContext();

  if (role?.toLowerCase() === "candidate") {
    return <CandidateOverviewSummary darkMode={darkMode} />;
  }

  if (role?.toLowerCase() === "hr") {
    return <HROverviewSummary darkMode={darkMode} />;
  }

  return <AdminOverviewSummary darkMode={darkMode} role={role} />;
}