"use client";
import { IAuthResponse } from "@/app/_types/IAuthResponse";
import { IUser } from "@/app/_types/IUser";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [user, setUser] = useState<IUser>({ username: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

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

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      //credentials: "include",
      signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        setLoading(false);

        if (!response.ok) {
          return response.json().then((errData) => {
            setError("Invalid username or password.");
            throw new Error(errData.message);
          });
        }
        console.log("Login successfull!")
        return response.json();
      })

      .then((data: IAuthResponse) => {
        const token = data.token;
        const role = data.role;

        if (!token) {
          setError("No token recieved from server.");
          return;
        }
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("role", role);

        role.match("USER") && router.push("/");
        role.match("ADMIN") && router.push("/admin");

      })

      .catch((error) => {
        if (error.name === "AbortError") {
          setError("Request timed out. Please try again.");
        } else {
          setError(error.message || "An error occurred. Please try again.");
        }
        setLoading(false);
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-green-900 rounded-lg shadow-lg p-8">
        <header className="text-4xl font-bold text-white flex items-center justify-center">
          Sign In
        </header>
        <form onSubmit={onSubmit} className="space-y-4 text-white">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-white">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleUserChange}
              placeholder="Username"
              required
              className="mt-1 block w-full p-2  rounded-md shadow-sm text-green-950 focus:outline-none bg-green-200 placeholder-green-900"
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
              placeholder="Password"
              required
              className="mt-1 block w-full p-2 rounded-md shadow-sm text-green-950 focus:outline-none bg-green-200 placeholder-green-900"
            />
          </div>
          {error && <p className="text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm ${
              loading
                ? "bg-green-600 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-600 focus:ring-2 focus:ring-green-500"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
