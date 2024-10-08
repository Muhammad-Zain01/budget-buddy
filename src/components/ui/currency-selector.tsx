import React, { useMemo, useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import clsx from "clsx";
import currencies from "@/constants/currencies";
import useResponsive from "@/hooks/useResponsive";
import DrawerView from "../drawer-view";

interface Currency {
  code: string;
  label: string;
  symbol: string;
}

interface CurrencySelectorProps {
  value?: string;
  onChange?: (code: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useResponsive();

  const selectedCurrency = useMemo(() => {
    return currencies.find((c) => c.symbol === value) || currencies[0];
  }, [value]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (currency: Currency) => {
    setIsOpen(false);
    if (onChange) onChange(currency.symbol);
  };

  const filteredCurrencies: Currency[] = currencies.filter(
    (currency) =>
      currency.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-xs md:text-sm text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-200"
      >
        <div className="flex items-center justify-between">
          <span>
            {selectedCurrency.code} - {selectedCurrency.label}
          </span>
          <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
      </button>
      <CurrencyView
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredCurrencies={filteredCurrencies}
        handleSelect={handleSelect}
        selectedCurrency={selectedCurrency}
      />
    </div>
  );
};

const CurrencyView = ({
  isOpen,
  setIsOpen,
  searchTerm,
  setSearchTerm,
  filteredCurrencies,
  handleSelect,
  selectedCurrency,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredCurrencies: Currency[];
  handleSelect: (currency: Currency) => void;
  selectedCurrency: Currency;
}) => {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <DrawerView
        title={`Select Currency`}
        open={isOpen}
        onOpenChange={(value: boolean) => {
          if (!value) {
            setIsOpen(false);
          }
        }}
      >
        <div className="z-10 h-auto w-full bg-transparent  rounded-md">
          <div className="p-2">
            <div className=" mb-3">
              <input
                type="text"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 text-sm py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <ul className="h-[500px]  overflow-y-scroll">
            {filteredCurrencies.map((currency: Currency) => (
              <li
                key={currency.code}
                onClick={() => handleSelect(currency)}
                className={clsx(
                  "px-4 py-2 text-xs md:text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between",
                  {
                    "bg-gray-300 dark:bg-gray-600":
                      currency.code === selectedCurrency.code,
                  }
                )}
              >
                <div>
                  <span className="font-medium dark:text-gray-200">
                    {currency.code}
                  </span>
                  <span className="ml-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    {currency.label}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-xs md:text-sm dark:text-gray-300">
                    {currency.symbol}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </DrawerView>
    );
  }
  if (isOpen) {
    return (
      <>
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
          <div className="p-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 text-sm py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <ul className="max-h-60 overflow-auto">
            {filteredCurrencies.map((currency: Currency) => (
              <li
                key={currency.code}
                onClick={() => handleSelect(currency)}
                className={clsx(
                  "px-4 py-2 text-xs md:text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between",
                  {
                    "bg-gray-300 dark:bg-gray-600":
                      currency.code === selectedCurrency.code,
                  }
                )}
              >
                <div>
                  <span className="font-medium dark:text-gray-200">
                    {currency.code}
                  </span>
                  <span className="ml-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    {currency.label}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-xs md:text-sm dark:text-gray-300">
                    {currency.symbol}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
};

export default CurrencySelector;
