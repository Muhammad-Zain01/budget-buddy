import { useQuery } from "@tanstack/react-query";
import { Response, Transaction } from "@/models";
import request from "@/lib/request";
import useDateFilterStore from "@/store/date-filter";
import { useState } from "react";

const useTransaction = () => {
  const [page, setPage] = useState(1);
  const { selectedMonth, selectedYear } = useDateFilterStore();

  const getTransaction = async () => {
    const res = await request(
      `/api/transaction/?month=${
        selectedMonth + 1
      }&year=${selectedYear}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await res.json();
  };

  const data = useQuery<Response<Transaction[]>>({
    queryKey: ["transaction", selectedMonth, selectedYear, page],
    queryFn: getTransaction,
  });

  return {
    page,
    setPage,
    ...data,
  };
};

export default useTransaction;
