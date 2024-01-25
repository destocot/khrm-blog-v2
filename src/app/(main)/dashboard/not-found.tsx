import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function NotFound() {
  return (
    <main className="grid min-h-[50dvh] place-items-center">
      <div className="flex flex-col items-center gap-5">
        <ExclamationTriangleIcon width="100" height="100" />
        <h1 className="text-4xl font-bold tracking-tight">Unauthorized</h1>
      </div>
    </main>
  );
}
