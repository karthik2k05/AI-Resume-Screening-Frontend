import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SupportAPI from "../../api/supportApi";

export default function Feedbacks() {
  const { darkMode } = useOutletContext();

const bg = darkMode ? "bg-[#0f172a]" : "bg-gray-100";
const card = darkMode ? "bg-[#1e293b]" : "bg-white";
const text = darkMode ? "text-white" : "text-gray-900";
const subText = darkMode ? "text-gray-300" : "text-gray-500";
const border = darkMode ? "border-gray-700" : "border-gray-200";
const input = darkMode
  ? "bg-[#111827] text-white border-gray-700"
  : "bg-white text-black border-gray-300";
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbacksPerPage, setFeedbacksPerPage] = useState(10);
  const filteredFeedbacks = feedbacks.filter((f) =>
  f.candidate_name.toLowerCase().includes(search.toLowerCase())
);

const indexOfLast = currentPage * feedbacksPerPage;
const indexOfFirst = indexOfLast - feedbacksPerPage;

const currentFeedbacks = filteredFeedbacks.slice(
  indexOfFirst,
  indexOfLast
);

const totalPages = Math.ceil(
  filteredFeedbacks.length / feedbacksPerPage
);
  const averageRating =
  feedbacks.length > 0
    ? (
        feedbacks.reduce((sum, f) => sum + f.rating, 0) /
        feedbacks.length
      ).toFixed(1)
    : 0;

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      const res = await SupportAPI.get("/feedbacks");
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`p-0.5 min-h-screen ${bg} ${text}`}>

      <h1 className="text-2xl font-bold mb-3 ">
        Candidate Feedbacks
      </h1>
      <div className="grid grid-cols-2 gap-6 mb-6">

  <div
  className={`${card} rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer`}>

    <h3 className={subText}>
      Total Feedbacks
    </h3>

    <h1 className="text-3xl font-bold text-blue-600 mt-2">
      {feedbacks.length}
    </h1>

  </div>

  <div
  className={`${card} rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer`}
>

    <h3 className={subText}>
  Average Rating
</h3>

    <h1 className="text-3xl font-bold text-yellow-500 mt-2">
      ⭐ {averageRating}
    </h1>

  </div>

</div>
        <input
  type="text"
  placeholder="Search Candidate..."
  value={search}
  onChange={(e) =>{ setSearch(e.target.value);setCurrentPage(1);}}
  className={`w-full mb-6 px-4 py-2 rounded-xl border outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-600 ${input}`}/>

      <div className={`${card} rounded-2xl shadow-xl overflow-hidden border ${border}`}>

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr >

              <th className="p-3 text-left">
                Candidate
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-center">
                Rating
              </th>

              <th className="p-3 text-left">
                Comments
              </th>

              <th className="p-3 text-left">
                Date
              </th>

            </tr>

          </thead>

          <tbody className={darkMode ? "bg-[#111827]" : "bg-gray-100"}>

            {currentFeedbacks.map((feedback) => (

              <tr key={feedback.feedback_id}
              className={`${card} shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.005]`}>

                <td className="p-3">
                  {feedback.candidate_name}
                </td>

                <td className="p-3">
                  {feedback.email}
                </td>

                <td className="p-3 text-center">
                  {"⭐".repeat(feedback.rating)}
                </td>
                <td className="p-3 text-yellow-500">
  {feedback.comments}
</td>

                <td className="p-3">
                  {new Date(feedback.created_at).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                })}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      <div
  className={`flex items-center justify-between mt-6 ${card} p-3 rounded-xl shadow`}>

  {/* Left Side */}
  <div className={darkMode ? "text-gray-300" : "text-gray-600"}>
    Showing{" "}
    <span className="font-semibold">
      {filteredFeedbacks.length === 0
        ? 0
        : indexOfFirst + 1}
    </span>
    –
    <span className="font-semibold">
      {Math.min(indexOfLast, filteredFeedbacks.length)}
    </span>{" "}
    of{" "}
    <span className="font-semibold">
      {filteredFeedbacks.length}
    </span>{" "}
    feedbacks
  </div>

  {/* Right Side */}
  <div className="flex items-center gap-5">

    <div className="flex items-center gap-2">
      <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
  Rows
</span>

      <select
        value={feedbacksPerPage}
        onChange={(e) => {
          setFeedbacksPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}
        className={`border rounded-lg px-3 py-2 ${input}`}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>

    </div>

    <button
      disabled={currentPage === 1}
      onClick={() =>
        setCurrentPage((prev) => prev - 1)
      }
      className={`px-5 py-2 rounded-xl border ${border} disabled:opacity-50 disabled:cursor-not-allowed ${
  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
      Previous
    </button>

    <button
      className="
      w-11
      h-11
      rounded-xl
      bg-blue-600
      text-white
      font-semibold
      "
    >
      {currentPage}
    </button>

    <button
      disabled={currentPage === totalPages}
      onClick={() =>
        setCurrentPage((prev) => prev + 1)
      }
      className={`px-5 py-2 rounded-xl border ${border} disabled:opacity-50 disabled:cursor-not-allowed ${
  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
}`}
    >
      Next
    </button>

  </div>

</div>

    </div>
  );
}