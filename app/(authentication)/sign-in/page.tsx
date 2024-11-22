"use client";
import { IUser } from "@/app/_types/IUser";
import { ChangeEvent, FormEvent, useState } from "react";

export default function SignIn() {
  const [user, setUser] = useState<IUser>({ username: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleUserChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!user.username || !user.password) {
      setError("Both username and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    const timeout: number = 10_000;
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      //credentials: "include",
      signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        setLoading(false);
        if (response.ok) {
          console.log("Login successful");
        } else {
          setError("Invalid username or password.");
        }
      })
      .catch(() => {
        setLoading(false);
        setError("An error occurred. Please try again.");
      });
  }
  return (
    <div className="p-4">
      <header>Sign In</header>
      <form onSubmit={onSubmit}>
        {/* Username */}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleUserChange}
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleUserChange}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
