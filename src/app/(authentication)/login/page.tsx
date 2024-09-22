import LoginForm from "@/components/authentication/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-[88vh] md:p-24 py-10 px-2 dark:bg-gray-900">
      <div className="flex w-full justify-center items-center rounded-md">
        <div
          className="w-[600px] p-14 px-8 md:px-10 rounded-lg dark:bg-gray-800"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.3) 0px 2px 8px 0px",
          }}
        >
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
