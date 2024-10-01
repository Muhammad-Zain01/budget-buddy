"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";
import Loading from "../loader";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/use-toast";
import { user as userService } from "@/lib/services/user";
import useCurrentUser from "@/hooks/api/useCurrentUser";
import { uploadProfile } from "@/lib/services/upload";
import ProfileSelector from "../ui/profile-selector";

const AccountSetting = () => {
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const { data, refetch } = useCurrentUser();
  const user = data?.data;

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    image: z
      .union([z.instanceof(File), z.string().url()])
      .nullable()
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      image: user?.profileImage,
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user?.name as string);
      form.setValue("email", user?.email as string);
    }
  }, [user, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (
      values.currentPassword &&
      values.newPassword &&
      values.currentPassword == values.newPassword
    ) {
      return toast({
        title: "Error",
        description: "New password should be different than current Password",
        variant: "destructive",
      });
    }

    if (values.newPassword && values.newPassword.length < 5) {
      return toast({
        title: "Error",
        description: "New password must be at least 5 characters long",
        variant: "destructive",
      });
    }

    if (values.image) {
      const fileId = await uploadProfile(values.image);
      // @ts-ignore
      values.image = fileId;
    }

    setLoading(true);
    try {
      await userService.updateUser({
        name: values.name,
        ...(values.currentPassword && values.newPassword
          ? {
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            }
          : {}),
        ...(values.image ? { image: values.image } : {}),
      });
      toast({
        title: "Success",
        description: "Your account information has been updated.",
      });
      refetch();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          (error as { message?: string })?.message ||
          "Failed to update account information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>
          Update your account details, including your name, email, and password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === "loading" ? (
          <div className="flex justify-center items-center h-[400px]">
            <Loading />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile</FormLabel>
                      <FormControl>
                        <ProfileSelector
                          onChange={(file) => field.onChange(file)}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name..." {...field} />
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
                        <Input
                          disabled
                          placeholder="Enter email..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your current password..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your new password..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountSetting;
