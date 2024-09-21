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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  const { createUser } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (value: any) => {
    const data = {
      name: value.name,
      username: value.username,
      email: value.email,
      password: value.password,
    };

    const response = await createUser(data);
    console.log("xx", response);
    if (response?.status) {
      toast({
        title: "Account Created Successfully",
      });
      router.push("/login");
    } else {
      toast({
        title: response?.message || "Something wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-lg md:text-2xl font-semibold">Create an account</h1>
        <p className="md:text-sm text-xs text-neutral-500">
          Welcome back! please create account to continue:
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email." {...field} />
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
                      placeholder="Enter your password."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full mt-5 h-10">
            Register
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleButton label="Register with Google" />
        </form>
      </Form>
      <div className="text-center mt-5 text-sm text-neutral-500">
        {"Don't"} have an account?{" "}
        <Link href="/login" className="font-[400] text-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
