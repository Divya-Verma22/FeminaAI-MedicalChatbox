import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Send, Menu } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";

// ---------------- Navbar ----------------
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-pink-100/80 backdrop-blur-md shadow-md py-2"
          : "bg-pink-50 py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-1">
          <span className="text-2xl font-bold text-purple-600">Femina</span>
          <span className="text-xl font-medium text-pink-400">AI</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {["About", "How It Works", "FAQs"].map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-purple-700 hover:text-yellow-400 font-medium transition"
            >
              {item}
            </a>
          ))}
          <Button
            onClick={() => navigate("/chat")}
            className="bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-full px-5 py-2 shadow-md hover:shadow-lg"
          >
            Chat Now
          </Button>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-purple-700"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav className="mt-4 pb-4 md:hidden flex flex-col space-y-4 bg-pink-100 rounded-2xl p-6 shadow-md">
          {["About", "How It Works", "FAQs"].map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-purple-700 hover:text-yellow-400 font-medium"
            >
              {item}
            </a>
          ))}
          <Button
            onClick={() => navigate("/chat")}
            className="bg-purple-200 hover:bg-purple-300 text-purple-900 w-full rounded-full px-4 py-2"
          >
            Chat Now
          </Button>
        </nav>
      )}
    </header>
  );
};

// ---------------- Chat Page ----------------
interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: number;
}

const exampleQuestions = [
  "What are early signs of pregnancy?",
  "How can I increase my chances of getting pregnant?",
  "What causes irregular periods?",
];

const ChatPage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Initialize session
  useEffect(() => {
    const savedSessionId = localStorage.getItem("chatSessionId");
    if (savedSessionId) setSessionId(savedSessionId);
    else {
      const newSessionId = Math.random().toString(36).substring(2, 15);
      setSessionId(newSessionId);
      localStorage.setItem("chatSessionId", newSessionId);
    }
  }, []);

  // Load history
  useEffect(() => {
    if (!sessionId) return;
    const savedMessages = localStorage.getItem(`chatHistory-${sessionId}`);
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, [sessionId]);

  // Save history
  useEffect(() => {
    if (!sessionId) return;
    localStorage.setItem(`chatHistory-${sessionId}`, JSON.stringify(messages));
  }, [messages, sessionId]);

  // Auto clear chat after 5 min
  useEffect(() => {
    if (!sessionId) return;
    const timeout = setTimeout(() => {
      setMessages([]);
      localStorage.removeItem(`chatHistory-${sessionId}`);
      const newSessionId = Math.random().toString(36).substring(2, 15);
      setSessionId(newSessionId);
      localStorage.setItem("chatSessionId", newSessionId);
    }, 5 * 60 * 1000);
    return () => clearTimeout(timeout);
  }, [sessionId, messages]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Send Message + Typewriter Effect for Bot
  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      role: "user",
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: content,
        sessionId,
      });

      const fullResponse =
        response.data.data || "Sorry, I encountered an error.";
      let displayed = "";
      const words = fullResponse.split(" ");

      // Add an empty bot message first
      const botMessage: Message = {
        role: "bot",
        content: "",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMessage]);

      // Gradually update bot message
      for (let i = 0; i < words.length; i++) {
        await new Promise((res) => setTimeout(res, 50)); // speed
        displayed += (i > 0 ? " " : "") + words[i];
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = displayed;
          return [...updated];
        });
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, I encountered an error.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleExampleClick = (question: string) => sendMessage(question);

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(`chatHistory-${sessionId}`);
    const newSessionId = Math.random().toString(36).substring(2, 15);
    setSessionId(newSessionId);
    localStorage.setItem("chatSessionId", newSessionId);
  };

  return (
    <>
      <Navbar />
      <section className="bg-yellow-50 pt-28 pb-16 min-h-screen flex flex-col">
        <div className="section-container flex-grow flex flex-col">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-purple-900">
            Try Our AI Assistant
          </h2>
          <p className="text-lg md:text-xl text-purple-700 mb-12 text-center max-w-3xl mx-auto">
            Ask a question and experience how our AI can help with your women's
            health concerns
          </p>

          <div className="max-w-3xl mx-auto bg-pink-50 rounded-2xl shadow-lg flex flex-col p-6 flex-grow">
            {/* Chat Messages */}
            <div className="bg-yellow-50 rounded-xl p-4 flex flex-col flex-grow overflow-y-auto mb-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <h3 className="text-xl font-semibold mb-2 text-purple-900">
                    Women's Health Assistant
                  </h3>
                  <p className="text-purple-700 mb-4 max-w-md">
                    Ask me anything about women's reproductive health,
                    pregnancy, or infertility.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
                    {exampleQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleExampleClick(q)}
                        className="text-left text-sm bg-purple-200 text-purple-900 rounded-lg p-2 hover:bg-purple-300 transition"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-4 rounded-2xl max-w-[80%] break-words ${
                    msg.role === "user"
                      ? "self-end bg-pink-200 text-purple-900"
                      : "self-start bg-purple-200 text-purple-900"
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        if (!inline) {
                          return (
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              PreTag="div"
                              className={className}
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          );
                        }
                        return (
                          <code
                            className="bg-yellow-100 px-1 rounded"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                      li({ children }) {
                        return <li className="ml-4 list-disc">{children}</li>;
                      },
                      p({ children }) {
                        return <p className="mb-2">{children}</p>;
                      },
                      h3({ children }) {
                        return (
                          <h3 className="text-lg font-semibold mt-3 mb-1">
                            {children}
                          </h3>
                        );
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>

                  <div className="text-xs text-purple-700 mt-1 text-right">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="self-start mb-2 p-4 rounded-2xl max-w-[50%] bg-purple-100 text-purple-900 animate-pulse">
                  AI is typing...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question here..."
                className="flex-grow rounded-full border border-purple-300 bg-yellow-100 text-purple-900 p-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <Button
                type="submit"
                className="bg-purple-300 hover:bg-purple-400 text-white rounded-full h-12 w-12 flex items-center justify-center p-0"
              >
                <Send size={18} />
              </Button>
              {messages.length > 0 && (
                <Button
                  type="button"
                  onClick={clearChat}
                  className="ml-2 bg-pink-200 border border-pink-300 text-purple-900 rounded-full px-4 hover:bg-pink-300"
                >
                  Clear
                </Button>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChatPage;
