interface DisplayProps {
  hasMemory: boolean;
  expression: string;
  value: string;
}

export const Screen: React.FC<DisplayProps> = ({
  value,
  hasMemory,
  expression,
}) => {
  return (
    <div className="flex flex-col justify-between rounded-md p-3 m-0 h-[120px]">
      <div className="text-sm opacity-50 text-right flex w-full justify-end mb-2 mt-7">
        {hasMemory && <span>M</span>}
        <span>{expression}</span>
      </div>

      <div className="text-4xl flex items-center justify-end overflow-hidden">
        {value}
      </div>
    </div>
  );
};

export default Screen;
