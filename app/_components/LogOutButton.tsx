"use client"

import { useRouter } from 'next/navigation'

const LogoutButton = () => {

    const router = useRouter();

    const handleLogOut = () => {

        sessionStorage.clear()
        router.push("/sign-in")
    }
    

  return (
    <div>
        <button
        onClick={handleLogOut}
        className="px-6 py-2 bg-pink-300 text-white font-medium rounded hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-rose-300 transition-all">
            Log Out
        </button>
      
    </div>
  )
}

export default LogoutButton
