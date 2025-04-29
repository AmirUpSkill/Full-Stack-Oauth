"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
const googleLoginPath = "/oauth2/authorization/google";
const loginInitiationUrl = `${BACKEND_URL}${googleLoginPath}`;

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-card text-card-foreground rounded-xl border border-border/50 shadow-xl transition-shadow duration-300 ease-in-out hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Sign In / Sign Up
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Continue with your Google account to access Proxym POC.
          </p>
        </div>

        <div className="pt-4">
          <a
            href={loginInitiationUrl}
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button className="w-full h-12 text-base" variant="outline">
              <Image
                src="/google-oauth.png"
                alt="Google logo"
                width={24}
                height={24}
                className="mr-3"
              />
              Sign In with Google
            </Button>
          </a>
        </div>

        <div className="text-center text-sm">
          <Link href="/" className="font-medium text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;