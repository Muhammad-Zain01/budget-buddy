import RegisterForm from "@/components/authentication/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-[88vh] md:p-24 py-10 px-2  bg-gray-100 dark:bg-gray-900">
      <div className=" flex w-full justify-center items-center rounded-md ">
        <div
          className="w-[600px] p-14 px-6 md:px-10 rounded-lg bg-white dark:bg-gray-800"
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
