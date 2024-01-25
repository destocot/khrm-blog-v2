"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function Error() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex grow flex-col items-center gap-5 p-5">
        <ExclamationTriangleIcon width="100" height="100" />
        <h1 className="text-4xl font-bold tracking-tight">Error</h1>
        <p>An unexpected error occured</p>
      </main>
      <Footer />
    </div>
  );
}
