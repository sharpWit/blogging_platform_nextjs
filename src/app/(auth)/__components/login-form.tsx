"use client";

import { useState } from "react";
import type { Route } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  // 1. Define your form.
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isPending, setIsPending] = useState<boolean>(false);
  // 2. Define a submit handler.
  const onSubmit = (values: SignInSchemaType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    handleAuthenticate(values);
  };

  const handleAuthenticate = async (formData: SignInSchemaType) => {
    try {
      setIsPending(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `There was a problem in your authorization`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        router.push("/posts" as Route);
        toast({
          variant: "success",
          title: "Wellcome!.",
          description: `You're logged in successfully`,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
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
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormDescription>This is your email.</FormDescription>
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
                  <Input placeholder="Enter your password" {...field} />
                </FormControl>
                <FormDescription>This is your password.</FormDescription>
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
    </>
  );
}
