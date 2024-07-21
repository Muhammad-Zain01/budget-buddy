import AuthIllustration from "@/components/authentication/auth-illustration";
import RegisterForm from "@/components/authentication/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen p-24 bg-gray-100">
      <div className=" flex w-full justify-center items-center rounded-md ">
        <div
          className="w-[600px] p-14 px-10 rounded-lg bg-white"
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          {" "}
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
