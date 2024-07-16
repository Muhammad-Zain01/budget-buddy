import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function Component() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-1 gap-8">
        <nav className="hidden w-48 flex-col gap-4 sm:flex">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Link
            href="#"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
            prefetch={false}
          >
            General
          </Link>
          <Link
            href="#"
            className="rounded-md px-4 py-2 text-muted-foreground hover:bg-muted"
            prefetch={false}
          >
            Notifications
          </Link>
          <Link
            href="#"
            className="rounded-md px-4 py-2 text-muted-foreground hover:bg-muted"
            prefetch={false}
          >
            Security
          </Link>
          <Link
            href="#"
            className="rounded-md px-4 py-2 text-muted-foreground hover:bg-muted"
            prefetch={false}
          >
            Integrations
          </Link>
          <Link
            href="#"
            className="rounded-md px-4 py-2 text-muted-foreground hover:bg-muted"
            prefetch={false}
          >
            Billing
          </Link>
          <Link
            href="#"
            className="rounded-md px-4 py-2 text-muted-foreground hover:bg-muted"
            prefetch={false}
          >
            Advanced
          </Link>
        </nav>
        <div className="flex-1 mt-12">
          <section>
            <h2 className="mb-4 text-xl font-bold">General Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account details, including your name, email, and
                  password.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john@example.com" />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </section>
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-bold">Notification Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications from the app.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <Switch id="email-notifications" defaultChecked />
                    <Label htmlFor="email-notifications">
                      Email Notifications
                    </Label>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch id="push-notifications" />
                    <Label htmlFor="push-notifications">
                      Push Notifications
                    </Label>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch id="in-app-notifications" defaultChecked />
                    <Label htmlFor="in-app-notifications">
                      In-App Notifications
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </section>
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-bold">Security Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Enhance the security of your account by enabling two-factor
                  authentication.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <Switch id="two-factor-auth" />
                    <Label htmlFor="two-factor-auth">
                      Enable Two-Factor Authentication
                    </Label>
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="backup-codes">Backup Codes</Label>
                    <Textarea
                      id="backup-codes"
                      rows={3}
                      defaultValue="123456, 789012, 345678"
                    />
                    <p className="text-sm text-muted-foreground">
                      Use these backup codes to access your account if you lose
                      your two-factor authentication device.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </section>
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-bold">Integrations</h2>
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>
                  Manage the third-party services connected to your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <ChromeIcon className="h-6 w-6" />
                      <div>
                        <p className="font-medium">Google</p>
                        <p className="text-sm text-muted-foreground">
                          john@example.com
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <GithubIcon className="h-6 w-6" />
                      <div>
                        <p className="font-medium">GitHub</p>
                        <p className="text-sm text-muted-foreground">
                          john-doe
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <TwitterIcon className="h-6 w-6" />
                      <div>
                        <p className="font-medium">Twitter</p>
                        <p className="text-sm text-muted-foreground">
                          @johndoe
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Add Integration</Button>
              </CardFooter>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function GithubIcon(props) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function TwitterIcon(props) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
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
