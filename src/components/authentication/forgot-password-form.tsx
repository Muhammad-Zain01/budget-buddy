"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import Link from "next/link";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { user } from "@/lib/services/user";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const { toast } = useToast();

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await user.forgotPassword(value.email);

      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for further instructions.",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        variant: "destructive",
        title: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white text-black dark:bg-gray-800 dark:text-white">
      <div className="mb-8">
        <h1 className="text-lg md:text-2xl font-semibold">
          Forgot Your Password?
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 dark:text-gray-300">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 text-white bg-primary hover:bg-primary-dark transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-5 text-xs md:text-sm text-neutral-500 dark:text-gray-400">
        Remember your password?{" "}
        <Link href="/login" className="font-[400] text-primary">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
