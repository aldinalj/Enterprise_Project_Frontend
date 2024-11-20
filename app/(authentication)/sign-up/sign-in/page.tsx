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

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(user),
    });
  }

  return (
    <>
      <div className="p-4">
        <p>DEBUGGING: {user.username}</p>
        <p>DEBUGGING: {user.password}</p>

        <header>Sign Up</header>
        <section>
          <form onSubmit={onSubmit}>
            {/* Username */}
            <section>
              <label htmlFor="username"></label>
              <input
                className="border "
                placeholder="username.."
                type="text"
                name="username"
                onChange={(event) => handleUserChange(event)}
              />
            </section>

            {/* Password */}
            <section>
              <label htmlFor="password"></label>
              <input
                className="border"
                placeholder="password.."
                type="password"
                name="password"
                onChange={(event) => handleUserChange(event)}
              />
            </section>

            <button type="submit">Login</button>
          </form>
        </section>
      </div>
    </>
  );
}
