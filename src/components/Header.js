"use client"
import { useRouter } from "next/navigation";
import BackIcon from "./icons/BackIcon";

export default function Header() {
  const router = useRouter()
  return (
    <div className="flex flex-row justify-between p-4">
      <button onClick={() => router.push('/')} >BlackBoard </button>
      <button onClick={()=>router.back()}>
        <BackIcon />
      </button>
    </div>
  );
}