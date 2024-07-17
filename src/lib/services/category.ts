import { CategoryType } from "@/models";
import request from "../request";

type CategoryInput = {
  categoryName: string;
  categoryType: CategoryType;
  icon: string;
};
export const Category = {
  add: async (data: CategoryInput) => {
    const res = await request("/api/category/add", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },
  update: async (data: CategoryInput, id: number) => {
    const res = await request(`/api/category/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },
  remove: async (id: number) => {
    const res = await request(`/api/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },
};
