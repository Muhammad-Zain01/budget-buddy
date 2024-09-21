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
import Loading from "../loader";
import CurrencySelector from "../ui/currency-selector";
import useCurrentUser from "@/hooks/api/useCurrentUser";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { user } from "@/lib/services/user";

const Preferences = () => {
  const { status } = useSession();
  const { data } = useCurrentUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currency = data?.data?.currency || "";

  const formSchema = z.object({
    currency: z.string().min(1, "Currency is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: currency,
    },
  });

  useEffect(() => {
    if (currency) {
      form.setValue("currency", currency as string);
    }
  }, [currency, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await user.updateUser(values);
      console.log(response);
      toast({
        title: "Success",
        description: "Your preferences have been updated.",
      });
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Update your Preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "loading" ? (
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
                <Button type="submit" className="gap-1" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
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
