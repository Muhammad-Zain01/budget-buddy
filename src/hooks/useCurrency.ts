import { useState } from "react";

const useCurrency = () => {
  const [currency, setCurrency] = useState("USD");
  return {
    currency,
  };
};

export default useCurrency;
