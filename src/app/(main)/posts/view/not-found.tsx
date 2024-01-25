import { ChatBubbleIcon } from "@radix-ui/react-icons";

export default function NotFound() {
  return (
    <main className="grid place-items-center min-h-[50dvh]">
      <div className="flex flex-col items-center gap-5">
        <ChatBubbleIcon width="100" height="100" />
        <h1 className="text-4xl font-bold tracking-tight">Post Not Found</h1>
      </div>
    </main>
  );
}
