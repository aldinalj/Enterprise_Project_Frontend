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
    <div>
      <p>Credentials</p>
      {user ? (
        <>
          <p>Username: {user.username}</p>
          <p>Password: {user.password}</p>
        </>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}
