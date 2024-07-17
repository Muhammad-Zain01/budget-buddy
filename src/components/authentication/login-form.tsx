"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (value: any) => {
    const response = await signIn("credentials", {
      username: value.username,
      password: value.password,
      redirect: false,
    } as { username: string; password: string; redirect: boolean });
    if (response?.ok) {
      toast({
        title: "Account Created Successfully",
      });
      router.push("/dashboard");
    } else {
      if (response?.error) {
        toast({
          variant: "destructive",
          title: response?.error,
        });
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Log in to your Account</h1>
        <p className="text-sm text-neutral-500">
          Welcome back! Select method to log in:
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Email or Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full mt-5 h-10">
            Login
          </Button>
        </form>
      </Form>

      <div className="text-center mt-5 text-sm text-neutral-500">
        {"Don't"} have an account?{" "}
        <Link href="/register" className="font-[400] text-primary">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
