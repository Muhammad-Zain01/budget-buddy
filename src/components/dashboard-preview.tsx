import { useTheme } from "next-themes";

const DashbaordPreview = () => {
  const { theme } = useTheme();
  const img = `/preview/preview-${theme == "dark" ? "dark" : "light"}.png`;
  return (
    <div className="">
      {/* eslint-disable-next-line */}
      <img
        src={img}
        alt="Dashboard Preview"
        width={800}
        height={600}
        className="rounded-lg shadow-xl"
      />
    </div>
  );
};

export default DashbaordPreview