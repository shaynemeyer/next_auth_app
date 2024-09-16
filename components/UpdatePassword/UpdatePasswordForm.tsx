"use client";

import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { updatePassword } from "./actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const formSchema = passwordMatchSchema;

function UpdatePasswordForm({ token }: { token: string }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await updatePassword({
      token,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    if (response?.tokenInvalid) {
      window.location.reload();
    }

    if (response?.error) {
      form.setError("root", {
        message: response.message,
      });
    } else {
      toast({
        title: "Password changed",
        description: "Your password has been updated.",
        className: "bg-green-500 text-white",
      });
      form.reset();
    }
  };

  return form.formState.isSubmitSuccessful ? (
    <div>
      Your password has been updated.{" "}
      <Link href="/login" className="underline">
        Click here to login to your account.
      </Link>
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          disabled={form.formState.isSubmitting}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password Confirm</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!!form.formState.errors.root?.message && (
            <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          )}
          <Button type="submit">Update Password</Button>
        </fieldset>
      </form>
    </Form>
  );
}

export default UpdatePasswordForm;
