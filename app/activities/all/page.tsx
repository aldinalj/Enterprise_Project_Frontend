"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IActivity } from "../../_types/IActivity";
import ActivityCard from "@/app/_components/ActivityCard";
import GoBackButton from "@/app/_components/GoBackButton";
import { useRouter } from "next/navigation";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("authToken");
  const router = useRouter();

  useEffect(() => {

  if (!token) {
    setError("Token could not be found. Please log in to access this page.");
    router.push("/login");
    return;
  }

    fetch("http://localhost:8080/activities/all")
    
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
      {role ? (
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
        <div className="text-center">
          <h1>Login or register to access this page.</h1>
          <GoBackButton />
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </main>
  );
}