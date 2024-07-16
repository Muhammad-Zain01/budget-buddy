import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarClockIcon } from "lucide-react";

const DateFilter = () => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className="w-[280px] justify-start text-left font-normal"
          >
            <CalendarClockIcon className="mr-2 h-4 w-4" />
            June 01, 2023 - June 30, 2023
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar  mode="range" numberOfMonths={2} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateFilter;
