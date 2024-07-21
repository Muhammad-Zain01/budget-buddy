import request from "@/lib/request";
import { Response } from "@/models";
import { Account } from "@/models/Account";
import { useQuery } from "@tanstack/react-query";

const useAccount = () => {
  const getAccount = async () => {
    const res = await request("/api/account/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  };
  return useQuery<Response<Account[]>>({
    queryKey: ["account"],
    queryFn: getAccount,
  });
};

export default useAccount;
