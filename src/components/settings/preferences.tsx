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
import { useEffect, useMemo } from "react";
import Loading from "../loader";

import currencies from "@/constants/currencies";
import CurrencySelector from "../ui/currency-selector";

const Preferences = () => {
  const { data, status } = useSession();
  const user = data?.user;

  const formSchema = z.object({
    currency: z.string(),
    email: z.string().email(),
    currentPassword: z.string(),
    newPassword: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user?.name as string);
      form.setValue("email", user?.email as string);
    }
    // eslint-disable-next-line
  }, [user]);

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const Currency = useMemo(
    () =>
      currencies.map((c) => ({
        label: c.label,
        value: c.code,
      })),
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Update your Preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        {status == "loading" ? (
          <div className="flex justify-center items-center h-[400px]">
            <Loading />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <CurrencySelector {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5 flex">
                <Button type="submit" className="gap-1">
                  {/* {loading && <Spinner className="text-white w-4 " />} */}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default Preferences;
