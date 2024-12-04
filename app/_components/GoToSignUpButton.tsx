import { useRouter } from "next/navigation";
import React from "react";

const GoToSignUpButton = () => {
  const router = useRouter();

  const handleRedirectToSignUp = () => {
    router.push("/sign-up")
  }

  return (
    <div>
      <button
        onClick={handleRedirectToSignUp}
        className="px-6 py-2 bg-emerald-800 text-white font-medium rounded hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all"
      >
        Sign up
      </button>
    </div>
  );
};

export default GoToSignUpButton;
