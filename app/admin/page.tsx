"use client";

import { useRouter } from "next/navigation";
import BackButton from "../_components/GoBackButton";
import LogoutButton from "../_components/LogoutButton";

export default function AdminPage() {
  const router = useRouter();
  const role = sessionStorage.getItem("role");

  const handleNavigateToDeleteUser = () => {
    router.push("/admin/delete-user");
  };

  return (
    <main>

{role?.match("ADMIN") ? (

<div>
<h1 className="text-3xl font-bold text-center text-indigo-600 mt-8">
  Welcome to the admin page
</h1>
<div className="mt-6 text-center">
  <p className="text-lg text-indigo-500 mb-4">
    What would you like to do?
  </p>
  <button
    onClick={handleNavigateToDeleteUser}
    className="px-6 py-2 bg-indigo-400 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
  >
    Delete User
  </button>
  <LogoutButton />
</div>
</div>

) : (

<div>
  <h1>YOU SHALL NOT PASS!!!</h1>
  <BackButton />
</div>

)}
      
    </main>
  );
}
