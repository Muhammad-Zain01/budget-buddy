import errors from "@/lib/error";
import request from "../request";

export const user = {
  updateUser: async (data: {
    currency?: string;
    newPassword?: string;
    currentPassword?: string;
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
  verifyUser: async (data: { code: string }) => {
    try {
      const res = await request("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("result", res);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || errors.SERVER_ERROR);
      }

      return result;
    } catch (error) {
      console.error("Error verifying user:", error);
      throw error;
    }
  },
  resendEmail: async () => {
    try {
      const res = await request("/api/auth/resend", {
        method: "POST",
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
      console.error("Error resending email:", error);
      throw error;
    }
  },
};
