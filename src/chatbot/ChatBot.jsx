import { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import { chatbotFlow } from "../data/chatbotFlow";
import { knowledgeBase } from "../data/knowledgeBase";
import AIChat from "./AIChat";
import { useRef, useEffect } from "react";
import LiveChat from "./LiveChat";

export default function ChatBot({ darkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("main");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  useEffect(() => {

  const openChat = () => {
    setShowLiveChat(true);
  };

  window.addEventListener(
    "openLiveChat",
    openChat
  );

  return () => {
    window.removeEventListener(
      "openLiveChat",
      openChat
    );
  };

}, []);
  const bottomRef = useRef(null);
  useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}, [showHelpOptions, selectedAnswer, currentMenu]);

  const handleMenuSelect = (menuId) => {
    setSelectedAnswer(null);
    setShowHelpOptions(false);
    if (menuId === "live_chat") {
    setShowLiveChat(true);
    return;
  }

  if (menuId === "ask_ai") {
    setShowAIChat(true);
    return;
  }

    // If this menuId exists in knowledgeBase,
    // show the answer instead of opening another menu

    if (knowledgeBase[menuId]) {
        setSelectedAnswer(knowledgeBase[menuId]);
        return;
    }

    setCurrentMenu(menuId);
};


  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 z-50"
        >
          <FaRobot size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
  className={`fixed bottom-6 right-6 w-96 h-[600px] rounded-2xl shadow-2xl border overflow-hidden z-50 ${
    darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"
  }`}
>

          {/* Header */}
          <div className="bg-blue-600 text-white flex justify-between items-center px-5 py-4">
            <div>
             <h2 className="text-xl font-bold text-white">
                🤖 ResumeIQ Assistant
              </h2>

              <p className="text-sm text-blue-100">
                Smart Career Support
              </p>
            </div>

            <button onClick={() => setIsOpen(false)}>
              <FaTimes size={20} />
            </button>
          </div>

          {/* Body */}
          {showLiveChat ? (
    <LiveChat
  darkMode={darkMode}
  onBack={() => setShowLiveChat(false)}
/>
) : 
          showAIChat ? (

  <AIChat
  darkMode={darkMode}
  onBack={() => setShowAIChat(false)}
/>

) : (
          
<div
  className={`p-4 h-[520px] overflow-y-auto ${
    darkMode ? "bg-slate-800" : "bg-gray-50"
  }`}
>
    

  {currentMenu !== "main" && (
    <button
  onClick={() => {
    setCurrentMenu("main");
    setSelectedAnswer(null);
    setShowHelpOptions(false);
  }}
  className="text-blue-600 font-semibold mb-4 hover:underline"
>
  ← Back
</button>
  )}

  <div className="mb-5">
    <h3
  className={`text-2xl font-bold ${
    darkMode ? "text-white" : "text-gray-900"
  }`}
>
      {currentMenu === "main"
        ? "Hello 👋"
        : "Choose your issue"}
    </h3>
    {
    selectedAnswer && (

        <div
  className={`rounded-xl p-4 mb-4 border ${
    darkMode
      ? "bg-slate-700 border-slate-600"
      : "bg-blue-50 border-blue-200"
  }`}
>

            <h3
  className={`text-lg font-bold mb-2 ${
    darkMode ? "text-blue-300" : "text-blue-800"
  }`}
>
                {selectedAnswer.title}
            </h3>

            <p
  className={`whitespace-pre-line ${
    darkMode ? "text-gray-200" : "text-gray-700"
  }`}
>
                {selectedAnswer.answer}
            </p>

            <div className="flex gap-3 mt-5">

                <button
                    onClick={() => {
    setSelectedAnswer(null);
    setCurrentMenu("main");
    setShowHelpOptions(false);
}}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    👍 Solved
                </button>

                <button
  onClick={() => setShowHelpOptions(true)}
  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
>
  👎 Need Help
</button>

            </div>

        </div>

    )
}

    {showHelpOptions && (

<div
  className={`mt-4 border rounded-xl p-4 ${
    darkMode
      ? "bg-slate-700 border-slate-600"
      : "bg-gray-50 border-gray-200"
  }`}
>

<h4
  className={`font-semibold mb-3 ${
    darkMode ? "text-white" : "text-gray-900"
  }`}
>
I'm sorry that didn't solve your problem.
</h4>

<button
onClick={() => setShowAIChat(true)}
className="w-full mb-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
>
🤖 Ask AI Assistant
</button>

<button
onClick={() => setShowLiveChat(true)}
className="w-full mb-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
>
👤 Contact Admin
</button>
<div ref={bottomRef}></div>

<button
onClick={() => setShowHelpOptions(false)}
className={`w-full border py-2 rounded-lg ${
  darkMode
    ? "border-slate-500 text-white hover:bg-slate-600"
    : "border-gray-300 hover:bg-gray-100"
}`}
>
⬅ Back
</button>


</div>

)}

    <p
  className={`mt-1 ${
    darkMode ? "text-gray-300" : "text-gray-600"
  }`}
>
      {currentMenu === "main"
        ? "How can I help you today?"
        : "Select one of the following options."}
    </p>
  </div>

  <div className="space-y-2">

    {!selectedAnswer &&
chatbotFlow[currentMenu]?.map((item) => (

      <button
        key={item.id}
        onClick={() => handleMenuSelect(item.id)}
        className={`
w-full
flex
items-center
justify-between
px-4
py-2.5
rounded-xl
border
shadow-sm
transition-all
${
  darkMode
    ? "bg-slate-900 border-slate-600 hover:bg-slate-700"
    : "bg-white border-gray-300 hover:bg-blue-50"
}
`}
      >

        <span
 className={`font-semibold text-base ${
   darkMode ? "text-white" : "text-gray-900"
 }`}
>
          {item.title}
        </span>

        <span className="text-gray-500 text-xl">
          ›
        </span>

      </button>

    ))}

  </div>

</div>
 )} </div>
      )}
    </>
  );
}