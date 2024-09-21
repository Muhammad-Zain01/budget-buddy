import clsx from "clsx";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import AddButton from "../add-button";

type ComponentProps = {
  active: string;
  onChange: (tab: string) => void;
  addModal: (value: boolean) => void;
};
const CategoryTabs: React.FC<ComponentProps> = ({
  active,
  onChange,
  addModal,
}) => {
  return (
    <Tabs>
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger
            value="income"
            className={clsx(
              "px-3 text-xs md:text-sm",
              active === "income" && "bg-white  text-black"
            )}
            onClick={() => onChange("income")}
          >
            Income
          </TabsTrigger>
          <TabsTrigger
            value="expense"
            className={clsx(
              "px-3 text-xs md:text-sm",
              active === "expense" && "bg-white text-black "
            )}
            onClick={() => onChange("expense")}
          >
            Expense
          </TabsTrigger>
        </TabsList>
        <AddButton label="Add Category" onClick={() => addModal(true)} />
      </div>
    </Tabs>
  );
};

export default CategoryTabs;
