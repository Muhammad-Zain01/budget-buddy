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
import { signIn } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import errors from "@/lib/error";
import GoogleButton from "./google-button";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        username: value.username,
        password: value.password,
        redirect: false,
      });

      if (response?.ok) {
        toast({
          title: "Account Login Successful",
        });
        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title:
            errors?.[response?.error as keyof typeof errors] || "Login Error",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" bg-white text-black dark:bg-gray-800 dark:text-white">
      <div className="mb-8">
        <h1 className="text-lg md:text-2xl font-semibold">
          Log in to your Account
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 dark:text-gray-300">
          Welcome back! Select method to log in:
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Email or Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Email or Username"
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
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
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground dark:bg-gray-800 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleButton label="Login with Google" />
        </form>
      </Form>

      <div className="text-center mt-5 text-sm text-neutral-500 dark:text-gray-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-[400] text-primary">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
