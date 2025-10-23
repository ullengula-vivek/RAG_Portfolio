// web/src/pages/index.tsx
import ChatWindow from "@/components/ChatWindow";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Resume RAG Chatbot</h1>
      <ChatWindow />
    </main>
  );
}
