"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteUserPage() {
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleDeleteUser = () => {
    const token = sessionStorage.getItem("authToken");
   
    if (!token) {
      setError("Token could not be found. Please log in to access this page.");
      router.push("/login");
      return;
    }

    fetch(`http://localhost:8080/admin/delete-user?username=${encodeURIComponent(username)}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete  user.");
        }
        setMessage("User deleted successfully!");
      })
    
      .catch((error) =>
        setError(error.message || "Something went wrong. Please try again.")
      );
  };

  const handleNavigateToAdminPage = () => {
    router.push("/admin");
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-red-800 mt-8">
        Delete User Page
      </h1>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {message && <p className="text-green-500 text-center mt-4">{message}</p>}
      <div className="mt-6 text-center">
        <p className="text-lg text-white mb-4">Enter username to delete:</p>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="px-4 py-2 border text-black border-gray-300 rounded mb-4"
          placeholder="username"
        />
        <br />
        <button
          onClick={handleDeleteUser}
          className="px-6 py-2 bg-red-800 text-white font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all"
        >
          Delete User
        </button> <br /> <br />
        <button
          onClick={handleNavigateToAdminPage}
          className="px-6 py-2 bg-indigo-800 text-white font-medium rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all"
        >
          Go back to admin page
        </button>
      </div>
    </>
  );
}