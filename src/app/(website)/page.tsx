import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <WalletIcon className="h-6 w-6" />
          <span className="sr-only">Budget Finance App</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Sign In
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Take Control of Your Finances with Our Budget App
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Effortlessly manage your budget, track your spending, and
                achieve your financial goals with our powerful budget finance
                app.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Sign Up
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Download
                </Link>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              width="550"
              height="550"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid gap-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Features That Make Budgeting a Breeze
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our budget finance app offers a suite of powerful features to
                  help you take control of your finances and achieve your
                  financial goals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <BarChartIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Expense Tracking</h3>
                <p className="text-center text-muted-foreground">
                  Easily track your expenses and categorize them to gain
                  insights into your spending habits.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <CalendarIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Budgeting Tools</h3>
                <p className="text-center text-muted-foreground">
                  Create and manage your monthly budgets, set spending limits,
                  and receive alerts when you're approaching your limits.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <PieChartIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Reporting and Analytics</h3>
                <p className="text-center text-muted-foreground">
                  Generate detailed reports and visualizations to gain a deeper
                  understanding of your financial situation.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <WalletIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Savings Tracking</h3>
                <p className="text-center text-muted-foreground">
                  Set savings goals and track your progress towards achieving
                  them.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <DollarSignIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Bill Management</h3>
                <p className="text-center text-muted-foreground">
                  Easily manage your bills, set reminders, and ensure you never
                  miss a payment.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <TabletsIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Cross-Platform Sync</h3>
                <p className="text-center text-muted-foreground">
                  Access your financial data from any device, with seamless
                  synchronization across all your devices.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid gap-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our satisfied customers and see how our budget
                  finance app has helped them take control of their finances.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">John Doe</h3>
                <p className="text-center text-muted-foreground">
                  "This app has been a game-changer for my finances. It's\n easy
                  to use and has helped me stay on top of my budget."
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JA</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">Jane Appleseed</h3>
                <p className="text-center text-muted-foreground">
                  "I love how this app helps me track my expenses and set\n
                  realistic budgets. It's been a lifesaver for my financial\n
                  planning."
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">Sarah Miller</h3>
                <p className="text-center text-muted-foreground">
                  "This budget app has made it so much easier to manage my\n
                  finances. The reporting features are incredibly helpful in\n
                  understanding my spending patterns."
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid gap-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Pricing That Fits Your Budget
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that best suits your financial needs and start
                  taking control of your budget today.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-lg font-bold">Free</h3>
                <p className="text-4xl font-bold">$0</p>
                <p className="text-muted-foreground">per month</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Expense Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Budgeting Tools
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Basic Reporting
                  </li>
                </ul>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Sign Up
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-lg font-bold">Pro</h3>
                <p className="text-4xl font-bold">$9</p>
                <p className="text-muted-foreground">per month</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Expense Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Budgeting Tools
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Advanced Reporting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Savings Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Bill Management
                  </li>
                </ul>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Subscribe
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-lg font-bold">Enterprise</h3>
                <p className="text-4xl font-bold">$99</p>
                <p className="text-muted-foreground">per month</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Expense Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Budgeting Tools
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Advanced Reporting
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <footer className="bg-muted p-6 md:py-12 w-full">
          <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
            <div className="grid gap-1">
              <h3 className="font-semibold">Company</h3>
              <Link href="#" prefetch={false}>
                About Us
              </Link>
              <Link href="#" prefetch={false}>
                Careers
              </Link>
              <Link href="#" prefetch={false}>
                Contact
              </Link>
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold">Product</h3>
              <Link href="#" prefetch={false}>
                Features
              </Link>
              <Link href="#" prefetch={false}>
                Pricing
              </Link>
              <Link href="#" prefetch={false} />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function PieChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}

function TabletsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7" cy="7" r="5" />
      <circle cx="17" cy="17" r="5" />
      <path d="M12 17h10" />
      <path d="m3.46 10.54 7.08-7.08" />
    </svg>
  );
}

function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
