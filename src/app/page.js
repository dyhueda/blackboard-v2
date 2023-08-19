"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex justify-evenly h-20">
      <button
        onClick={() => {
          router.push("/login");
        }}
        className="w-5/12 rounded-xl bg-zinc-700"
      >
        Login
      </button>
      <button
        onClick={() => {
          router.push("/user");
        }}
        className="w-5/12 rounded-xl bg-zinc-700 "
      >
        Sign Up
      </button>
    </div>
  );
}
