import { useState } from "react";

export default function SupportTicket() {
  const [issueType, setIssueType] = useState("Login");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ticketId] = useState(
    () => "#" + Math.floor(1000 + Math.random() * 9000)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !description) {
      alert("Please fill in all fields.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-300 rounded-xl p-4">
        <h3 className="text-green-700 font-bold text-lg">
          ✅ Ticket Created Successfully
        </h3>

        <p className="mt-3">
          Ticket ID:
          <strong> {ticketId}</strong>
        </p>

        <p className="mt-2 text-sm text-gray-600">
          Our support team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-xl p-4 shadow"
    >
      <h3 className="font-bold text-lg mb-4">
        🎫 Raise Support Ticket
      </h3>

      <label className="text-sm font-medium">
        Issue Type
      </label>

      <select
        value={issueType}
        onChange={(e) => setIssueType(e.target.value)}
        className="w-full border rounded-lg p-2 mt-1 mb-3"
      >
        <option>Login</option>
        <option>Resume Upload</option>
        <option>ATS Score</option>
        <option>Jobs</option>
        <option>Payment</option>
        <option>Other</option>
      </select>

      <label className="text-sm font-medium">
        Email
      </label>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full border rounded-lg p-2 mt-1 mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="text-sm font-medium">
        Description
      </label>

      <textarea
        rows="4"
        placeholder="Describe your issue..."
        className="w-full border rounded-lg p-2 mt-1 mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
      >
        Submit Ticket
      </button>
    </form>
  );
}