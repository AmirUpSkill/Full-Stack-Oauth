"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { logoutUser } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const Header = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Attempting logout...");
    const success = await logoutUser();
    if (success) {
      console.log("Logout successful on backend, redirecting frontend...");
      router.push("/");
    } else {
      console.error("Logout request failed.");
    }
  };

  const renderAuthSection = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      );
    }

    if (user) {
      return (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium hidden sm:block">
            Hello, {user.name}!
          </span>
          <Button onClick={handleLogout} variant="outline" size="sm">
            Logout
          </Button>
        </div>
      );
    }

    return (
      <nav className="flex gap-2">
        <Link href="/login">
          <Button variant="outline" size="sm">Sign In</Button>
        </Link>
        <Link href="/login">
          <Button size="sm">Sign Up</Button>
        </Link>
      </nav>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold sm:inline-block">
            Proxym POC
          </span>
        </Link>
        {renderAuthSection()}
      </div>
    </header>
  );
};
export default Header;