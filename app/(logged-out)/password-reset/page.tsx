"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { passwordReset } from "./actions";

const formSchema = z.object({
  email: z.string().email(),
});

function PasswordResetPage() {
  const searchParams = useSearchParams();
  // const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: decodeURIComponent(searchParams.get("email") ?? ""),
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    await passwordReset(data.email);
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      {form.formState.isSubmitSuccessful ? (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Email Sent</CardTitle>
          </CardHeader>
          <CardContent>
            If you have an account with us you will receive a password reset
            email at {form.getValues("email")}
          </CardContent>
        </Card>
      ) : (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Password Reset</CardTitle>
            <CardDescription>
              Enter your email address to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <fieldset
                  className="flex flex-col gap-2"
                  disabled={form.formState.isSubmitting}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {!!form.formState.errors.root?.message && (
                    <FormMessage>
                      {form.formState.errors.root?.message}
                    </FormMessage>
                  )}
                  <Button className="mt-3">Submit</Button>
                </fieldset>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="text-muted-foreground text-sm">
              Remember your password?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
            <div className="text-muted-foreground text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/login" className="underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
export default PasswordResetPage;
