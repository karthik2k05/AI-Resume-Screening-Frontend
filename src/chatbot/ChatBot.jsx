import { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import { chatbotFlow } from "../data/chatbotFlow";
import { knowledgeBase } from "../data/knowledgeBase";
import AIChat from "./AIChat";
import { useRef, useEffect } from "react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("main");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);
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
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border overflow-hidden z-50">

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
          {showAIChat ? (

  <AIChat onBack={() => setShowAIChat(false)} />

) : (
          
<div className="p-4 h-[520px] overflow-y-auto bg-gray-50">
    

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
    <h3 className="text-2xl font-bold text-gray-900">
      {currentMenu === "main"
        ? "Hello 👋"
        : "Choose your issue"}
    </h3>
    {
    selectedAnswer && (

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">

            <h3 className="text-lg font-bold text-blue-800 mb-2">
                {selectedAnswer.title}
            </h3>

            <p className="text-gray-700 whitespace-pre-line">
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

<div className="mt-4 border rounded-xl p-4 bg-gray-50">

<h4 className="font-semibold mb-3">
I'm sorry that didn't solve your problem.
</h4>

<button
onClick={() => setShowAIChat(true)}
className="w-full mb-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
>
🤖 Ask AI Assistant
</button>

<button
className="w-full mb-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
>
💬 Contact Live Support
</button>
<div ref={bottomRef}></div>

<button
onClick={() => setShowHelpOptions(false)}
className="w-full border py-2 rounded-lg hover:bg-gray-100"
>
⬅ Back
</button>


</div>

)}

    <p className="text-gray-600 mt-1">
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
        className="
          w-full
          flex
          items-center
          justify-between
          px-4
          py-2.5
          rounded-xl
          bg-white
          border
          border-gray-300
          shadow-sm
          hover:border-blue-500
          hover:bg-blue-50
          transition-all
        "
      >

        <span className="text-gray-900 font-semibold text-base">
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