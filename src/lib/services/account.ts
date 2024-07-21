import request from "../request";

type AccountInput = {
  name: string;
  balance: number;
  type: string;
};

export const Account = {
  add: async (data: AccountInput) => {
    const res = await request("/api/account", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },
  update: async (data: AccountInput, id: number) => {
    const res = await request(`/api/account/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },
  remove: async (id: number) => {
    const res = await request(`/api/account/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },
};
