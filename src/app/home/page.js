import Navbar from "../../components/navbar";
import Chatbot from "../../components/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2F0E4] text-black">
      <Navbar />

      {/* Centered chatbot area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <Chatbot />
      </main>
    </div>
  );
}