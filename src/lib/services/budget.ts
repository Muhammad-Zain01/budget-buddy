import request from "../request";

type BudgetAdd = {
  name: string;
  amount: string;
  categoryId: string;
  isRecurring: boolean;
};

export const Budget = {
  add: async (data: BudgetAdd) => {
    const res = await request("/api/budget", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },
  remove: async (id: number) => {
    const res = await request(`/api/budget/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },
};
