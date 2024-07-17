import clsx from "clsx";

type ComponentProps = {
  icon: string;
  onClick?: () => void;
  className?: string;
};

export const Icon: React.FC<ComponentProps> = ({
  icon,
  className,
  onClick,
}) => {
  return (
    <img
      onClick={onClick}
      src={`/icons/${icon}.png`}
      className={clsx(className, "dark:brightness-0 dark:invert")}
      alt={icon}
    />
  );
};
