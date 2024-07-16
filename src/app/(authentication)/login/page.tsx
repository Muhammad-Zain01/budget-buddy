import AuthIllustration from "@/components/authentication/auth-illustration";
import LoginForm from "@/components/authentication/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen p-24">
      <div className=" flex w-full border items-center rounded-md ">
        <div className="w-6/12 h-full bg-primary rounded-md">
          <AuthIllustration type="register" />
        </div>
        <div className="w-6/12 px-20">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
