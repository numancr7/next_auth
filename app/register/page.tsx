"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";


function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }


    try {
      // react-query
      // loading, error, debounce
      const res = await fetch("/api/auth/register", {
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
        throw new Error(data.error || "Registration failed");
      }

      console.log(data);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[40vw] flex-column m-auto">
      <h1 className="font-bold">Register</h1>
      <form onSubmit={handleSumit}
      >
        <input
          type="email"
          className="w-full rounded border p-2"

          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full rounded border p-2"

          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full rounded border p-2"

          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit"
                  className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
>Register</button>
      </form>
      <div className="text-center">
        <p>
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;