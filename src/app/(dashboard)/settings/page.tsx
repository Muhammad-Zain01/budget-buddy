import Preferences from "@/components/settings/preferences";
import AccountSetting from "@/components/settings/account-settings";

export default function Component() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-1 gap-8">
        <div className="flex-1 mt-12 space-y-5">
          <section>
            <h2 className="mb-4 text-xl font-bold">General Settings</h2>
            <AccountSetting />
          </section>
          <section>
            <Preferences />
          </section>
        </div>
      </div>
    </div>
  );
}
