import request from "@/lib/request";
import { Response } from "@/models";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  const getUser = async () => {
    const res = await request("/api/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  };

  return useQuery<Response<any>>({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

export default useCurrentUser;
