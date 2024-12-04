import { useRouter } from "next/navigation";
import React from "react";

const GoToSignInButton = () => {
  const router = useRouter();

  const handleRedirectToSignIn = () => {
    router.push("/sign-in")
  }

  return (
    <div>
      <button
        onClick={handleRedirectToSignIn}
        className="px-6 py-2 bg-green-700 text-white font-medium rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
      >
        Sign in
      </button>
    </div>
  );
};

export default GoToSignInButton;
