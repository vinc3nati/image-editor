import HomePage from "@/components/Home";
import { signIn, signOut, useSession } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, status } = useSession();

  if (status === "loading") {
    return (
      <p
        className={`flex min-h-screen flex-col gap-4 items-center p-12 overflow-hidden ${inter.className}`}
      >
        <span>Loading...</span>
      </p>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div
        className={`flex min-h-screen flex-col gap-4 items-center p-12 overflow-hidden ${inter.className}`}
      >
        <h1 className="text-xl">You are not authenticated, please login!</h1>
        <button
          className="bg-blue-300 px-3 py-2 rounded uppercase"
          onClick={() => {
            signIn();
          }}
        >
          Login
        </button>
      </div>
    );
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-12 overflow-hidden ${inter.className}`}
    >
      <header className="flex items-center gap-8">
        <h1 className="text-lg">
          Hello,
          <span>{data?.user?.name}!</span>
        </h1>
        <button
          className="border border-blue-300 px-2 py-1.5 rounded uppercase"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      </header>
      <HomePage />
    </main>
  );
}
