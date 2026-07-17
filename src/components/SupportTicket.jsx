import { useState } from "react";

export default function SupportTicket() {
  const [issueType, setIssueType] = useState("Login");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
 const [submitted, setSubmitted] = useState(false);
const [ticket, setTicket] = useState(null);
const [loading, setLoading] = useState(false);
  const [ticketId] = useState(
    () => "#" + Math.floor(1000 + Math.random() * 9000)
  );

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !description) {
    alert("Please fill in all fields.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/support/tickets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issue_type: issueType,
          email,
          description,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      setTicket(data.ticket);
      setSubmitted(true);

      setIssueType("Login");
      setEmail("");
      setDescription("");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Unable to submit support ticket.");
  } finally {
    setLoading(false);
  }
};

 if (submitted && ticket) {
  return (
    <div className="bg-green-50 border border-green-300 rounded-xl p-4">
      <h3 className="text-green-700 font-bold text-lg">
        🎉 Support Ticket Submitted
      </h3>

      <p className="mt-3">
        Ticket ID:
        <strong> #{ticket.ticket_id}</strong>
      </p>

      <p className="mt-2">
        Status:
        <strong> {ticket.status}</strong>
      </p>

      <p className="mt-3 text-sm text-gray-600">
        Thank you for contacting ResumeIQ Support.
        <br />
        Our team will review your request shortly.
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
  disabled={loading}
  className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 disabled:bg-gray-400"
>
  {loading ? "Submitting..." : "Submit Ticket"}
</button>
    </form>
  );
}