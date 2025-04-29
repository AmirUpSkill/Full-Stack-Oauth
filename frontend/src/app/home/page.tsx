"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      console.log("HomePage: User not authenticated. Redirecting to /login...");
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(height.14))]">
         <h1 className="text-2xl font-semibold mb-4">Loading Your Session...</h1>
         <div className="space-y-2">
            <Skeleton className="h-8 w-64 rounded-md" />
            <Skeleton className="h-4 w-72 rounded-md" />
            <Skeleton className="h-4 w-48 rounded-md" />
         </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-theme(height.14))] px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome back, {user.name}!
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          You successfully logged in using <span className="font-medium text-primary">{user.provider}</span>.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          (Email: {user.email})
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-theme(height.14))]">
        <p>Redirecting...</p>
    </div>
  );
};

export default HomePage;