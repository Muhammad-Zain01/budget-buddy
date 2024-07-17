import DateFilter from "./date-filter";
import ThemeShifter from "./theme-shifter";
import User from "./user";

const Header = () => {
  

  return (
    <header className="sticky top-0 z-10 border-b bg-background ">
      <div className="mx-auto  flex h-16 max-w-full items-center justify-end px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <DateFilter />
          <ThemeShifter />
          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
