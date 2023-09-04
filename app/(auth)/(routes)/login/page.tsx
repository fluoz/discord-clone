"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@/components/icons/icon";
import { useToast } from "@/components/ui/use-toast";

const loginSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const LoginPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    try {
      signIn("credentials", values);
      router.push("/");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.response.data,
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session]);

  if (!isMounted) {
    return null;
  }
  return (
    <Dialog open={isMounted}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Login
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            We`re so excited to see you again!
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 ">
          <button
            onClick={() => signIn("google")}
            className="flex border rounded-sm px-2 py-2  gap-4 items-center"
          >
            <Icon.google className="w-8 h-8" />
            <span className="text-zinc-500">Login With Google</span>
          </button>
          <div className="grid grid-cols-11 ">
            <Separator className="border-zinc-100 mt-4 col-span-5" />
            <p className="col-span-1 text-center mt-[2px]">or</p>
            <Separator className="border-zinc-100 mt-4 col-span-5" />
          </div>
        </div>
        <Form {...form}>
          <form className="" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 px-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter your email"
                        {...field}
                      />
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
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="text-sm my-3 block px-6 text-zinc-900 font-medium">
              Dont have any account?{" "}
              <Link href="/register" className="underline text-indigo-900/80">
                Register Here
              </Link>
            </p>
            <DialogFooter className="bg-gray-100 px-6 py-4 ">
              <Button variant={"primary"} disabled={isLoading}>
                Login
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPage;
