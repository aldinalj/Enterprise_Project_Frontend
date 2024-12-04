"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IActivity } from "../../_types/IActivity";
import ActivityCard from "@/app/_components/ActivityCard";
import GoBackButton from "@/app/_components/GoBackButton";
import { useRouter } from "next/navigation";
import GoToSignInButton from "@/app/_components/GoToSignInButton";
import GoToSignUpButton from "@/app/_components/GoToSignUpButton";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("authToken");
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/activities/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return response.json();
      })

      .then((data: IActivity[]) => {
        setActivities(data);
      })

      .catch((error) =>
        setError(
          error.message || "Something went wrong when fetching activities."
        )
      )

      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      {token ? (
        <div>
          <h1 className="text-center mt-3 text-4xl">Activities</h1>
          <div className="flex items-center justify-center min-h-screen overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))
              ) : (
                <p>No activities found.</p>
              )}
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
      {error && <p className="text-red-500 text-center">{error}</p>}
    </main>
  );
}
