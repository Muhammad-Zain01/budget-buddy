import { useQuery } from "@tanstack/react-query";
import { Response, Transaction } from "@/models";
import request from "@/lib/request";

const useTransaction = () => {
  const getTransaction = async () => {
    const res = await request("/api/transaction/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  };
  return useQuery<Response<Transaction[]>>({
    queryKey: ["transaction"],
    queryFn: getTransaction,
  });
};

export default useTransaction;
