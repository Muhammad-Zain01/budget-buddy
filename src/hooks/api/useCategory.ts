import request from "@/lib/request";
import { Category, Response } from "@/models";
import { useQuery } from "@tanstack/react-query";

const useCategory = () => {
  const getCategory = async () => {
    const res = await request("/api/category/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  };

  return useQuery<Response<Category[]>>({
    queryKey: ["category"],
    queryFn: getCategory,
  });
};

export default useCategory;
