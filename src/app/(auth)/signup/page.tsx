import Link from "next/link";
import { SignupForm } from "./SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="space-y-5">
      <h1 className="tracking-tight font-bold text-3xl text-center">Sign Up</h1>
      <SignupForm />
      <p className="text-sm text-center">
        Already have an account? Sign in{" "}
        <Link href="/signin" className="hover:underline">
          here
        </Link>
      </p>
    </div>
  );
}
