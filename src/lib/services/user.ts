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
  forgotPassword: async (email: string) => {
    try {
      const res = await request("/api/auth/send-link", {
        method: "POST",
        body: JSON.stringify({ email }),
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
      console.error("Error sending forgot password email:", error);
      throw error;
    }
  },
  resetPassword: async (token: string, password: string) => {
    try {
      const res = await request("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password: password }),
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
      console.error("Error verifying reset token:", error);
      throw error;
    }
  },
};
