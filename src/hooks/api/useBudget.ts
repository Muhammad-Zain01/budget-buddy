import request from "@/lib/request";
import { Response } from "@/models";
import useDateFilterStore from "@/store/date-filter";
import { useQuery } from "@tanstack/react-query";
import { Budget } from "@/models/Budget";

const useBudget = () => {
  const { selectedMonth, selectedYear } = useDateFilterStore();

  const getBudgets = async () => {
    const res = await request(
      `/api/budget/?month=${selectedMonth + 1}&year=${selectedYear}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await res.json();
  };

  return useQuery<Response<Budget[]>>({
    queryKey: ["budgets", selectedMonth, selectedYear],
    queryFn: getBudgets,
  });
};

export default useBudget;
