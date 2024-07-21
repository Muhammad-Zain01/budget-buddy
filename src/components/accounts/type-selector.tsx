import clsx from "clsx";

type ComponentProps = {
  type: "cash" | "person";
  value: string;
  onChange: (type: string) => void;
};
const TypeSelector: React.FC<ComponentProps> = ({
  type = "cash",
  value,
  onChange,
}) => {
  const typeMaping = {
    cash: [
      {
        type: "Positive",
        description: "Select if you currently have money in the account",
        value: "p",
      },
      {
        type: "Negative",
        description: "Select if you currently owe money in the account",
        value: "n",
      },
    ],
    person: [
      {
        type: "Recievable",
        description:
          "Choose if the person whose account you are opening owes you money",
        value: "p",
      },
      {
        type: "Payable",
        description:
          "Choose if you owe the person whose account you are opening",
        value: "n",
      },
    ],
  };
  const types = typeMaping[type];
  return (
    <div className="flex  justify-between gap-2 mt-3">
      {types.map((item, index) => {
        return (
          <div
            key={index}
            className={clsx(
              "flex border flex-col w-full p-4 text-sm rounded-md cursor-pointer text-gray-600 dark:text-white hover:border-gray-500  dark:hover:border-white",
              value == item.value
                ? "border-gray-600 dark:border-white"
                : "dark:border-gray-500"
            )}
            onClick={() => {
              onChange(item.value);
            }}
          >
            {item.type}
            <p className="text-xs mt-1 text-gray-600 dark:text-gray-300">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TypeSelector;
