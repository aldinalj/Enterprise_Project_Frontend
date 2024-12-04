"use client";

import { useRouter } from "next/navigation";
import BackButton from "../_components/GoBackButton";
import LogoutButton from "../_components/LogOutButton";
import GoToSignInButton from "../_components/GoToSignInButton";
import GoToSignUpButton from "../_components/GoToSignUpButton";

export default function AdminPage() {
  const router = useRouter();
  const role = sessionStorage.getItem("role");

  const navigateToAllActivities = () => {
    router.push("/activities/all");
  };

  // const navigateToActivityById = () => {
  //   router.push("/activities/id");
  // };

  // const navigateToActivitiesByCode = () => {
  //   router.push("/activities/code");
  // };

  return (
    <main>

{role?.match("ADMIN") || role?.match("USER") ? (

<div>
<h1 className="text-3xl font-bold text-center text-indigo-600 mt-8">
  Welcome to the activities page
</h1>
<div className="mt-6 text-center space-y-5">
  <p className="text-lg text-indigo-500 mb-4">
    What would you like to do?
  </p>

    <div className="justify-center min-h-screen flex-col space-y-5">

  <button
    onClick={navigateToAllActivities}
    className="px-6 py-2 bg-indigo-400 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
  >
    All activities
  </button>

  {/* <button
    onClick={navigateToActivityById}
    className="px-6 py-2 bg-indigo-400 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
  >
    Search activities by ID
  </button>

  <button
    onClick={navigateToActivitiesByCode}
    className="px-6 py-2 bg-indigo-400 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
  >
    Search activities by weather code
  </button> */}

  <LogoutButton />
</div>
</div>
</div>

) : (
  

<div className="flex flex-col items-center justify-center min-h-screen">
  <h1 className="text-2xl font-bold mb-6">
    Log in or register to access this page
    </h1>

  <div className="space-y-5">
  <GoToSignInButton />
  <GoToSignUpButton />
  </div>

</div>

)}
      
    </main>
  );
}
