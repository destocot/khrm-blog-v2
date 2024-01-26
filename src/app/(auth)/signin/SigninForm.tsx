"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signin } from "@/actions/auth";
import { hasOwnProperty } from "@/lib/utils";
import { signinFormSchema, SigninFormSchemaType } from "@/lib/schemas";

export const SigninForm = () => {
  const form = useForm<SigninFormSchemaType>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, control, setError } = form;

  async function onSubmit(values: SigninFormSchemaType) {
    const { error, status } = (await signin(values)) ?? { status: 200 };
    switch (status) {
      case 200:
        break;
      case 400:
        const validationErrors = error;
        for (const fieldName in validationErrors) {
          if (hasOwnProperty(validationErrors, fieldName)) {
            const message = validationErrors[fieldName]?.[0];
            setError(fieldName, { message });
          }
        }
        break;
      case 404:
      case 500:
      default:
        setError("password", { message: error ?? "Something went wrong!" });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xs space-y-8 rounded p-5 shadow-custom dark:shadow-muted"
      >
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage className="text-warning" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-warning" />
            </FormItem>
          )}
        />
        <Button type="submit" aria-label="Sign in">
          Sign in
        </Button>
      </form>
    </Form>
  );
};
