import { Calculator } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import CalculatorModal from "../calculator-modal";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CurrencyView from "../ui/currency-view";

const TransactionInput = ({ label, form }: { label?: string; form: any }) => {
  const [calculatorModal, setCalculatorModal] = useState(false);
  return (
    <>
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className="flex items-center pl-3 pr-2 gap-2 border rounded-md">
                <span className="font-[400]">
                  <CurrencyView />
                </span>
                <Input
                  placeholder="Enter Amount..."
                  type="number"
                  {...field}
                  className="border-none  focus-visible:ring-0 shadow-none text-[13px] md:text-[16px]"
                />
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setCalculatorModal(true);
                  }}
                >
                  <Calculator className="w-[16px] md:w-[22px]" />
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <CalculatorModal
        open={calculatorModal}
        onClose={(value?: number) => {
          if (value) {
            form.setValue("amount", String(value));
          }
          setCalculatorModal(false);
        }}
      />
    </>
  );
};

export default TransactionInput;
