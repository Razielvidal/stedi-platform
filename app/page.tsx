"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8">STEDI Voice</h1>

      <section className="w-full max-w-md bg-white rounded-lg shadow p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4">Start Your Balance Test</h2>
        <p className="mb-6 text-gray-700">
          Call now for a hands-free experience.
        </p>
        <button
          onClick={() => window.location.href = "/api/auth/call"}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md"
        >
          Call Now
        </button>
      </section>

      <footer className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} STEDI &nbsp;|&nbsp;{" "}
        <Link href="/profile" className="underline">
          Your Profile
        </Link>
      </footer>
    </main>
  );
}
