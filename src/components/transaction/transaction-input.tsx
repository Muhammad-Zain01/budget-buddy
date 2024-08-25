import { Calculator } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import CalculatorModal from "../calculator-modal";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

const TransactionInput = ({ form }: { form: any }) => {
  const [calculatorModal, setCalculatorModal] = useState(false);
  return (
    <>
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center pl-3 pr-2 gap-2 border rounded-md">
                <span className="font-[400]">PKR</span>
                <Input
                  placeholder="Enter Amount..."
                  type="number"
                  {...field}
                  className="border-none focus-visible:ring-0 shadow-none text-[16px]"
                />
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setCalculatorModal(true);
                  }}
                >
                  <Calculator />
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
