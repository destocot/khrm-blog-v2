import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grid place-items-center grow">
        <div className="flex flex-col items-center gap-5">
          <ChatBubbleIcon width="100" height="100" />
          <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}
