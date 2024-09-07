import React from "react";

const EmptyRecord = ({
  title = "No Data Available",
  description = "There are no records to display at the moment.",
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <div className="min-h-[400px] mt-5 w-full flex flex-col items-center justify-center rounded-lg p-6">
      <img
        src="/illustrations/empty.svg"
        alt="No Data"
        className="w-64 h-64 mb-6"
      />
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
        {description}
      </p>
    </div>
  );
};

export default EmptyRecord;
