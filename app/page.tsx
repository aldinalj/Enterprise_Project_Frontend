"use client";
import { use, useEffect, useState } from "react";
import { IUser } from "./_types/IUser";

export default function Home() {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      setError("Token could not be found. Please log in to access this page.");
    }

    const timeout: number = 10_000;
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    fetch("http://localhost:8080/user/test", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(
              errorData.message || "Failed to fetch user details"
            );
          });
        }
        return response.json();
      })

      .then((data: IUser) => {
        setUser(data);
      })

      .catch((error) => {
        if (error.name === "AbortError") {
          setError("Request timed out. Please try again.");
        } else {
          setError(
            error.message || "Something went wrong when fetching user details."
          );
        }
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-sky-600 rounded-lg p-10 border-4 border-sky-800 shadpw-lg">
        <header className="text-4xl font-bold text-center text-sky-100 mb-6">
          Credentials
          </header>
          <div className="space-y-2">
      {user ? (
        <>
          <p className="text-lg text-sky-200 break-words">
            <span className="font-semibold">
              Username: {user.username}
              </span> 
            </p>
          <p className="text-lg text-sky-200 break-words">
          <span className="font-semibold">
            Password: {user.password}
            </span> 
            </p>
        </>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
    </div>
    </div>
  );
}
