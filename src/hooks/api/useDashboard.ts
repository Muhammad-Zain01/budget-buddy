import request from "@/lib/request";
import { Response } from "@/models";
import { useQuery } from "@tanstack/react-query";
import useDateFilterStore from "@/store/date-filter";

const useDashboard = () => {
  const { selectedMonth, selectedYear } = useDateFilterStore();

  const getDashboard = async () => {
    const res = await request(`/api/dashboard/?month=${selectedMonth}&year=${selectedYear}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  };

  return useQuery<Response<any>>({
    queryKey: ["dashboard", selectedMonth, selectedYear],
    queryFn: getDashboard,
  });
};

export default useDashboard;
