// import React, { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Send } from "lucide-react";

// interface Message {
//   role: "user" | "bot";
//   content: string;
// }

// const ChatPreview = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const chatEndRef = useRef<HTMLDivElement>(null);

//   const exampleQuestions = [
//     "What are early signs of pregnancy?",
//     "How can I increase my chances of getting pregnant?",
//     "What causes irregular periods?"
//   ];

//   // Scroll to bottom whenever messages change
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     const userMessage: Message = { role: "user", content: inputValue.trim() };
//     setMessages((prev) => [...prev, userMessage]);

//     // Simulate bot response (you can replace this with API call)
//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "bot",
//           content:
//             "This is a sample AI response for: " + inputValue.trim()
//         },
//       ]);
//     }, 500);

//     setInputValue("");
//   };

//   const handleExampleClick = (question: string) => {
//     setInputValue(question);
//     setTimeout(() => {
//       setMessages((prev) => [...prev, { role: "user", content: question }]);
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", content: "This is a sample AI response for: " + question }
//       ]);
//       setInputValue("");
//     }, 100);
//   };

//   return (
//     <section className="py-16 bg-white">
//       <div className="section-container">
//         <h2 className="section-title">Try Our AI Assistant</h2>
//         <p className="section-subtitle">
//           Ask a question and experience how our AI can help with your women's health concerns
//         </p>

//         <div className="max-w-3xl mx-auto card-shadow p-6 rounded-2xl bg-gray-50">
//           <div className="bg-white rounded-xl p-4 mb-4 h-72 flex flex-col overflow-y-auto">
//             {messages.length === 0 && (
//               <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
//                 <div className="w-16 h-16 bg-medical-light/30 rounded-full flex items-center justify-center mb-4">
//                   <div className="w-10 h-10 bg-medical text-white rounded-full flex items-center justify-center animate-pulse-gentle">
//                     <span className="font-bold">AI</span>
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">Women's Health Assistant</h3>
//                 <p className="text-gray-600 mb-4">
//                   Ask me anything about women's reproductive health, pregnancy, or infertility.
//                 </p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
//                   {exampleQuestions.map((question, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleExampleClick(question)}
//                       className="text-left text-sm bg-white border border-gray-200 rounded-lg p-2 hover:border-medical transition-colors"
//                     >
//                       {question}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`mb-2 p-3 rounded-xl max-w-[80%] ${
//                   message.role === "user" ? "self-end bg-medical text-white" : "self-start bg-medical-light/30 text-gray-800"
//                 }`}
//               >
//                 {message.content}
//               </div>
//             ))}
//             <div ref={chatEndRef} />
//           </div>

//           <form onSubmit={handleSubmit} className="flex gap-2">
//             <input
//               type="text"
//               value={inputValue}
//               onChange={handleInputChange}
//               placeholder="Type your question here..."
//               className="flex-grow rounded-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-medical/50"
//             />
//             <Button type="submit" className="btn-primary rounded-full h-12 w-12 flex items-center justify-center p-0">
//               <Send size={18} />
//             </Button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ChatPreview;
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const ChatPreview = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const exampleQuestions = [
    "What are early signs of pregnancy?",
    "How can I increase my chances of getting pregnant?",
    "What causes irregular periods?"
  ];

  // Map example questions to realistic AI responses
  const sampleBotResponses: Record<string, string> = {
    "What are early signs of pregnancy?":
      "Early signs can include missed periods, nausea, breast tenderness, fatigue, and frequent urination. It's best to confirm with a test or healthcare provider.",
    "How can I increase my chances of getting pregnant?":
      "Maintaining a healthy lifestyle, tracking ovulation, and consulting a healthcare provider can help improve your chances of conception.",
    "What causes irregular periods?":
      "Irregular periods can be caused by stress, hormonal imbalances, thyroid issues, PCOS, or changes in lifestyle. Consulting a doctor can help determine the cause."
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = { role: "user", content: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            sampleBotResponses[inputValue.trim()] ||
            "I'm here to help with your health questions! Could you please clarify?"
        }
      ]);
    }, 500);

    setInputValue("");
  };

  const handleExampleClick = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: question },
        { role: "bot", content: sampleBotResponses[question] }
      ]);
      setInputValue("");
    }, 100);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="section-container px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-3xl font-bold text-purple-800 mb-2 text-center">
          Try Our AI Assistant
        </h2>
        <p className="section-subtitle text-purple-700 mb-6 text-center">
          Ask a question and experience how our AI can help with your women's health concerns
        </p>

        <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-md bg-white">
          <div className="rounded-xl p-4 mb-4 h-72 flex flex-col overflow-y-auto bg-purple-50">
            {messages.length === 0 && (
              <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mb-4">
                  <div className="w-10 h-10 bg-purple-400 text-white rounded-full flex items-center justify-center animate-pulse">
                    <span className="font-bold">AI</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-800">
                  Women's Health Assistant
                </h3>
                <p className="text-purple-700 mb-4">
                  Ask me anything about women's reproductive health, pregnancy, or infertility.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
                  {exampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(question)}
                      className="text-left text-sm bg-white border border-purple-200 rounded-lg p-2 hover:bg-purple-100 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-3 rounded-xl max-w-[80%] break-words ${
                  message.role === "user"
                    ? "self-end bg-pink-200 text-purple-900"
                    : "self-start bg-purple-100 text-purple-800"
                }`}
              >
                {message.content}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your question here..."
              className="flex-grow rounded-full border border-purple-200 p-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <Button
              type="submit"
              className="rounded-full h-12 w-12 flex items-center justify-center p-0 bg-purple-400 hover:bg-purple-500 text-white"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChatPreview;
