import AuthIllustration from "@/components/authentication/auth-illustration";
import RegisterForm from "@/components/authentication/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen p-24">
      <div className=" flex w-full border items-center rounded-md ">
        <div className="w-6/12 h-full bg-primary rounded-md">
          <AuthIllustration type="register" />
        </div>
        <div className="w-6/12 px-20">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
