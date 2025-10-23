import { useState } from "react";
import axios from "axios";

export default function ChatWindow() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]); // append user message
    setInput("");

    try {
      const res = await axios.post("http://localhost:8000/query_resume", { query: input });
      const botMessage = { sender: "bot", text: res.data.answer };
      setMessages(prev => [...prev, botMessage]); // append bot response
    } catch (err) {
      setMessages(prev => [...prev, { sender: "bot", text: "Error fetching response." }]);
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md w-full max-w-xl h-[500px] flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask something..."
          className="flex-1 border rounded-lg px-4 py-2 mr-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
