"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AtSymbolIcon,
  KeyIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { lusitana } from "@/components/ui/fonts";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/hooks/use-toast";
import {
  signInSchema,
  SignInSchemaType,
} from "@/app/(auth)/__components/schemas";

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: SignInSchemaType) => {
    try {
      setIsPending(true);
      const result = await signIn("credentials", {
        redirect: false, // Avoid redirecting automatically
        email: values.email,
        password: values.password,
        callbackUrl: "/", // Automatically redirects to homepage after login
      });

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `There was a problem in your authorization: ${result.error}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        toast({
          variant: "success",
          title: "Welcome!",
          description: `You're logged in successfully`,
        });

        // Refresh the session and then navigate
        router.refresh();

        // Use setTimeout to delay navigation, allowing time for refresh to complete
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <h1
        className={`${lusitana.className} mb-3 ml-3 text-xl font-semibold text-muted-foreground`}
      >
        Please log in to continue.
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2 w-full relative">
                <AtSymbolIcon className="pointer-events-none absolute -left-3 -top-3 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-primary" />
                <FormLabel>Email</FormLabel>
              </div>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                To login use johndoe@example.com.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2 w-full relative">
                <KeyIcon className="pointer-events-none absolute -left-3 -top-3 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-primary" />
                <FormLabel>Password</FormLabel>
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormDescription>To login use s0//P4$$w0rD</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          <ArrowRightIcon className="h-5 w-5 text-muted-foreground" />
          <Button type="submit" disabled={isPending}>
            Log in
          </Button>
        </div>
      </form>
    </Form>
  );
}
