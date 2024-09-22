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
import useUser from "@/hooks/api/useUser";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import GoogleButton from "./google-button";
import { useState } from "react";

const formSchema = z.object({
  name: z.string(),
  username: z.string().min(3, {
    message: "Username must have 3 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(5, {
    message: "Password must have 5 characters.",
  }),
});

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  const { createUser } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const data = {
        name: value.name,
        username: value.username,
        email: value.email,
        password: value.password,
      };

      const response = await createUser(data);
      if (response?.status) {
        toast({
          title: "Account Created Successfully",
        });
        router.push("/login");
      } else {
        toast({
          title: response?.message || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
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
        <h1 className="text-lg md:text-2xl font-semibold">Create an account</h1>
        <p className="text-xs md:text-sm text-neutral-500 dark:text-gray-300">
          Welcome! Please create an account to continue:
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
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
                  <FormLabel className="text-sm font-medium">Password</FormLabel>
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
            {isLoading ? "Registering..." : "Register"}
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
          <GoogleButton label="Register with Google" />
        </form>
      </Form>
      <div className="text-center mt-5 text-sm text-neutral-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="font-[400] text-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
