import { useState } from "react";
import SupportTicket from "./SupportTicket";
export default function SupportCard() {
  const [showTicket, setShowTicket] = useState(false);
  if (showTicket) {
  return <SupportTicket />;
}

  return (

    <div className="bg-white border border-blue-200 rounded-xl p-4 shadow-md">

      <h3 className="font-bold text-blue-700 text-lg">
        👨‍💼 ResumeIQ Support
      </h3>

      <p className="text-sm text-gray-600 mt-2">
        Need assistance from our support team?
      </p>

      <div className="mt-4 space-y-2 text-sm">

        <p>
          🟢 <strong>Status:</strong> Online
        </p>

        <p>
          📧 <strong>Email:</strong> pvk5209@gmail.com
        </p>

        <p>
          📞 <strong>Phone:</strong> +91 98765 43210
        </p>

        <p>
          ⏰ <strong>Response Time:</strong> Within 30 minutes
        </p>

      </div>

      <div className="flex gap-2 mt-5">

        <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=pvk5209@gmail.com&su=ResumeIQ%20Support%20Request&body=Hello%20ResumeIQ%20Team,%0A%0AI'm%20facing%20an%20issue%20with%20ResumeIQ.%0A%0APlease%20help%20me.%0A%0AThank%20you."
  target="_blank"
  rel="noopener noreferrer"
  className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-center hover:bg-blue-700 transition"
>
  Contact Admin
</a>
<button
  onClick={() => setShowTicket(true)}
  className="flex-1 border border-blue-600 text-blue-600 rounded-lg py-2 hover:bg-blue-50"
>
  Raise Ticket
</button>

      </div>

    </div>
  );
}