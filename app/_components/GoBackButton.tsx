import { useRouter } from "next/navigation";
import React from "react";

const GoBackButton = () => {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={router.back}
        className="px-6 py-2 bg-indigo-400 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
      >
        Go Back
      </button>
    </div>
  );
};

export default GoBackButton;
