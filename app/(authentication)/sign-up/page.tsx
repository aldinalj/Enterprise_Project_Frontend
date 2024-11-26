"use client";
import { IUser } from "@/app/_types/IUser";
import { ChangeEvent, FormEvent, useState } from "react";

export default function SignUp() {
  const [user, setUser] = useState<IUser>({ username: "", password: "" });

  function handleUserChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    fetch("http://localhost:8080/user/register", {
      method: "POST",
      headers: { "content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(user),
    });
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
  <div className="w-full max-w-md bg-emerald-700 rounded-lg p-10 border-4 border-emerald-400 shadow-lg">
    <header className="text-4xl font-bold text-center text-sky-100 mb-6">
      Sign Up
    </header>
    <div className="text-sm text-sky-200 mb-6">
      <p>DEBUGGING: {user.username}</p>
      <p>DEBUGGING: {user.password}</p>
    </div>
    <section>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Username */}
        <section>
          <label htmlFor="username" className="block text-sky-100 mb-1">
            Username
          </label>
          <input
            className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="username.."
            type="text"
            name="username"
            onChange={(event) => handleUserChange(event)}
          />
        </section>

        {/* Password */}
        <section>
          <label htmlFor="password" className="block text-sky-100 mb-1">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="password.."
            type="password"
            name="password"
            onChange={(event) => handleUserChange(event)}
          />
        </section>

        <button
          type="submit"
          className="w-full bg-emerald-800 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Register
        </button>
      </form>
    </section>
  </div>
</div>
    </>
  );
}
