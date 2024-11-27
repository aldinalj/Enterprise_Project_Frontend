"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    if (!token) {
      setError("Token could not be found. Please log in to access this page.");
      router.push("/login");
      return;
    }

    fetch("http://localhost:8080/admin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to authenticate admin.");
        }
      })

      .catch((error) =>
        setError(error.message || "Something went wrong. Please try again.")
      );
  }, [router]);

  const handleNavigateToDeleteUser = () => {
    router.push("/admin/deleteuser");
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-8">
        Welcome to the admin page
      </h1>
      {error ? (
        <p className="text-red-500 text-center mt-4">{error}</p>
      ) : (
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-700 mb-4">
            What would you like to do?
          </p>
          <button
            onClick={handleNavigateToDeleteUser}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
          >
            Delete User
          </button>
        </div>
      )}
    </>
  );
}
