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
      className={className}
      alt={icon}
    />
  );
};
