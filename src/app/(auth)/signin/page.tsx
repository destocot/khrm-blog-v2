import Link from "next/link";
import { SigninForm } from "./SigninForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SigninPage() {
  return (
    <div className="space-y-5">
      <h1 className="tracking-tight font-bold text-3xl text-center">Sign In</h1>
      <SigninForm />
      {/* <p className="text-sm text-center">
        Don&apos;t have an account? Sign up{" "}
        <Link href="/signup" className="hover:underline">
          here
        </Link>
      </p> */}
    </div>
  );
}
