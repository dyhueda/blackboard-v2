"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateUserPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
        try {
          const res = await fetch("/api/user", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
              url: "create",
            }),
          });
          const response = await res.json();
          const message = response.message
          if (res.ok) {
            router.push(`/user/${response._id}`);
          } else {
            throw alert(message);
          }
        } catch (error) {
          console.error(error);
        }
      }

  return (
    <div className="flex flex-col rounded mt-10">
      <form
        onSubmit={handleSubmit}
        className="grid grid-col-1 place-items-center p-4 gap-4"
      >
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="p-1"
          placeholder="Username"
          type="string"
          value={username}
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="p-1"
          placeholder="Password"
          type="password"
          value={password}
        />

        <button type="submit" className="p-4 bg-blue-700 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
