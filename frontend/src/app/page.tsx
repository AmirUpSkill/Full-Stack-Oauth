import { Button } from "@/components/ui/button"; // Assuming you might want a CTA button later, though Header handles login
import Link from "next/link";

// Placeholder icons (replace with actual SVGs or an icon library like Lucide React)
const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 5.25v3a1.5 1.5 0 001.5 1.5h4.5a1.5 1.5 0 001.5-1.5v-3a3.75 3.75 0 10-7.5 0z" clipRule="evenodd" />
  </svg>
);

const RocketIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M15.59 14.37a6 6 0 01-5.84 7.38v.01a.75.75 0 01-.59.74l-.491.082a.75.75 0 01-.904-.63v-.01a.75.75 0 01.59-.74l.49-.083a6.002 6.002 0 015.84-7.38zm-5.94-7.38a6 6 0 017.38 5.84h.01a.75.75 0 01.74.59l.082.491a.75.75 0 01-.63.904v.01a.75.75 0 01-.74-.59l-.083-.49a6.002 6.002 0 01-7.38-5.84zm11.72-5.84a.75.75 0 01-.63.904l-.49.083a6.002 6.002 0 01-7.38 5.84h-.01a.75.75 0 01-.74.59l-.491.082a.75.75 0 01-.904-.63v-.01a.75.75 0 01.59-.74l.49-.083a6.002 6.002 0 017.38-5.84h.01a.75.75 0 01.74.59l.082.491a.75.75 0 01-.63.904z" clipRule="evenodd" />
  </svg>
);

const UserGroupIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.64l.008-.127a4.875 4.875 0 00-4.875-4.875h-.008a3.75 3.75 0 00-3.75 3.75z" />
  </svg>
);


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]"> {/* Adjust min-h based on header height */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  Secure & Simple Authentication
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
                  Focus on building your amazing application. Let Proxym handle the complexities of user sign-in with Google OAuth 2.0. Quick setup, reliable, and secure.
                </p>
              </div>
              <div className="space-x-4 pt-4">
                {/* The actual sign-in/sign-up buttons are in the Header */}
                <p className="text-sm text-muted-foreground">
                  Click "Sign In" or "Sign Up" above to get started!
                </p>
                {/* Example of how a button might look if needed here */}
                {/* <Link href="/login">
                  <Button size="lg">Get Started</Button>
                </Link> */}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm dark:bg-gray-700">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Use Proxym Auth?</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our POC demonstrates a streamlined and secure authentication flow.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
              {/* Feature 1 */}
              <div className="grid gap-2 text-center md:text-left">
                 <div className="flex justify-center md:justify-start">
                    <div className="bg-primary/10 text-primary rounded-lg p-3 inline-flex">
                       <LockIcon className="h-6 w-6" />
                    </div>
                 </div>
                <h3 className="text-xl font-bold">Secure Google Login</h3>
                <p className="text-muted-foreground">
                  Leverages Google's robust OAuth 2.0 protocol for secure authentication, keeping user credentials safe.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="grid gap-2 text-center md:text-left">
                <div className="flex justify-center md:justify-start">
                    <div className="bg-primary/10 text-primary rounded-lg p-3 inline-flex">
                       <RocketIcon className="h-6 w-6" />
                    </div>
                 </div>
                <h3 className="text-xl font-bold">Effortless Integration</h3>
                <p className="text-muted-foreground">
                  Simple backend setup and clear frontend interaction points make integration straightforward.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="grid gap-2 text-center md:text-left">
                 <div className="flex justify-center md:justify-start">
                    <div className="bg-primary/10 text-primary rounded-lg p-3 inline-flex">
                       <UserGroupIcon className="h-6 w-6" />
                    </div>
                 </div>
                <h3 className="text-xl font-bold">Focus on Your Core</h3>
                <p className="text-muted-foreground">
                  Spend less time on authentication boilerplate and more time building your unique application features.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Optional: Add more sections like How it Works, Testimonials, Pricing (for a real app) */}

      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Proxym Auth POC. All rights reserved.</p>
        {/* Optional: Add footer links */}
        {/* <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav> */}
      </footer>
    </div>
  );
}