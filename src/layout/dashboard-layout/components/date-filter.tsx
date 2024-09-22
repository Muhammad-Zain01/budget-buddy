import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarClockIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDateFilterStore from "@/store/date-filter";
import useResponsive from "@/hooks/useResponsive";
import DrawerView from "@/components/drawer-view";

const DateFilter = () => {
  const { isMobile } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);
  const { selectedMonth, selectedYear, setSelectedMonth, setSelectedYear } =
    useDateFilterStore();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const years = Array.from(
    { length: 10 },
    (_, i) => currentDate.getFullYear() - 5 + i
  );

  if (isMobile) {
    if (isMobile) {
      return (
        <>
          <Button
            id="date"
            variant="outline"
            className={`${
              isMobile ? "w-[150px]" : "w-[280px]"
            } justify-start text-left font-normal`}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            <CalendarClockIcon className="mr-2 h-4 w-4" />
            {format(
              new Date(selectedYear, selectedMonth),
              isMobile ? "MMM yyyy" : "MMMM yyyy"
            )}
          </Button>
          <DrawerView
            title={`Date Filter`}
            open={isOpen}
            onOpenChange={(e) => {
              if (!e) {
                setIsOpen(e);
              }
            }}
          >
            <FilterContent
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              setSelectedMonth={setSelectedMonth}
              setSelectedYear={setSelectedYear}
              months={months}
              years={years}
            />
          </DrawerView>
        </>
      );
    }
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={`${
              isMobile ? "w-[150px]" : "w-[280px]"
            } justify-start text-left font-normal`}
          >
            <CalendarClockIcon className="mr-2 h-4 w-4" />
            {format(
              new Date(selectedYear, selectedMonth),
              isMobile ? "MMM yyyy" : "MMMM yyyy"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="end">
          <FilterContent
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
            months={months}
            years={years}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

const FilterContent = ({
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
  months,
  years,
}: {
  selectedMonth: number;
  selectedYear: number;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
  months: string[];
  years: number[];
}) => {
  return (
    <div className="flex gap-3">
      <Select
        onValueChange={(value) => setSelectedMonth(parseInt(value))}
        defaultValue={selectedMonth.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month, index) => (
            <SelectItem key={month} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => setSelectedYear(parseInt(value))}
        defaultValue={selectedYear.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DateFilter;
