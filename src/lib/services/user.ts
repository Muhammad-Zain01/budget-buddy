import errors from "@/lib/error";
import request from "../request";

export const user = {
  updateUser: async (data: {
    currency?: string;
    password?: string;
    name?: string;
  }) => {
    try {
      const res = await request(`/api/settings/update-user`, {
        method: "PUT",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || errors.SERVER_ERROR);
      }
      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
};
