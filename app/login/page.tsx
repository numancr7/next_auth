"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // react-query
      // loading, error, debounce
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      console.log(data);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-8">
        <h1 className="text-2xl font-bold">Login</h1>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Login
        </button>
        <div className="text-center">
          <p>
            Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}

