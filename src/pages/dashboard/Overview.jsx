import { useOutletContext } from "react-router-dom";
import AdminOverviewSummary from "./AdminOverviewSummary";
import CandidateOverviewSummary from "./CandidateOverviewSummary";

const ROLE_LABELS = { admin: "Admin", hr: "HR", candidate: "Candidate" };

export default function Overview() {
  const { darkMode, role } = useOutletContext();

  if (role === "candidate") {
    return <CandidateOverviewSummary darkMode={darkMode} />;
  }
  return <AdminOverviewSummary darkMode={darkMode} role={role} roleLabel={ROLE_LABELS[role]} />;
}
