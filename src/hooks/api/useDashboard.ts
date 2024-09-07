import request from "@/lib/request";
import { Response } from "@/models";
import { Account } from "@/models/Account";
import { useQuery } from "@tanstack/react-query";

const useDashboard = () => {
  const getDashboard = async () => {
    const res = await request("/api/dashboard/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  };
  return useQuery<Response<any>>({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
};

export default useDashboard;
