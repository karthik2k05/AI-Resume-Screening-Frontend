import { useEffect, useState } from "react";
import SupportAPI from "../../api/supportApi";

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
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
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Candidate Feedbacks
      </h1>
      <div className="grid grid-cols-2 gap-6 mb-6">

  <div className="bg-white rounded-xl shadow p-6">

    <h3 className="text-gray-500">
      Total Feedbacks
    </h3>

    <h1 className="text-3xl font-bold text-blue-600 mt-2">
      {feedbacks.length}
    </h1>

  </div>

  <div className="bg-white rounded-xl shadow p-6">

    <h3 className="text-gray-500">
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
  onChange={(e) => setSearch(e.target.value)}
  className="mb-4 w-full border rounded-lg p-3"
/>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

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

          <tbody>

            {feedbacks
  .filter((f) =>
    f.candidate_name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((feedback) => (

              <tr
                key={feedback.feedback_id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">
                  {feedback.candidate_name}
                </td>

                <td className="p-3">
                  {feedback.email}
                </td>

                <td className="p-3 text-center">
                  {"⭐".repeat(feedback.rating)}
                </td>
                <div className="text-yellow-500">
                <td className="p-3">
                  {feedback.comments}
                </td>
                </div>

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

    </div>
  );
}