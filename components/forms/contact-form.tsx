import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loading from "../global/loading";
import { ContactUserFormSchema } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export interface IContactFormProps {
  title: string;
  subTitle: string;
  apiCall: (values: z.infer<typeof ContactUserFormSchema>) => any;
}

export function ContactForm({ title, subTitle, apiCall }: IContactFormProps) {
  const form = useForm<z.infer<typeof ContactUserFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(ContactUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const isLoading = form.formState.isLoading;

  //TODO: We want to create tags for each leads that comes from the form

  return (
    <Card className="max-w-[500px] w-[500px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(apiCall)}
            className="flex flex-col gap-4"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-4" disabled={isLoading} type="submit">
              {form.formState.isSubmitting ? <Loading /> : "Get a free quote!"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
