"use client";
import { use, useEffect, useState } from "react";
import { IFullUser } from "./_types/IFullUser";

export default function Home() {
  const [user, setUser] = useState<IFullUser | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/user/test", {
          headers: {
            Authorization: "Bearer tokengoeshere",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data: IFullUser = await response.json();
        setUser(data);
        setLoading(false);
      } catch (e) {
        setError("An error occurred while fetching usrr data.");
        setLoading(false);
        console.error(e);
      }
    };
    fetchUser();
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
