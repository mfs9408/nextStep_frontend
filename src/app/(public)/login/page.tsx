"use client";
import { ApiErrorResponse } from "@/types/api/response";
import PasswordField from "@/components/PasswordField";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import TextField from "@/components/TextField";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Route } from "@/enums/route";
import { login } from "@/api/auth";
import { toast } from "sonner";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm<{
    login: string;
    password: string;
  }>({
    defaultValues: { login: "", password: "" },
  });

  const onSubmit = async (data: { login: string; password: string }) => {
    setIsLoading(true);
    await login({
      email: data.login,
      password: data.password,
    })
      .then(() => router.push(Route.DASHBOARD))
      .catch(
        (
          error: ApiErrorResponse<{
            error: string;
            message: string;
            statusCode: number;
          }>,
        ) => {
          toast.error(error.message || "Unable to login");
        },
      );
    setIsLoading(false);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              icon
            </div>
            Femu Dev Corporation
          </Link>
        </div>
        <form
          className="flex flex-1 items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full max-w-xs">
            <div className="flex gap-6 flex-col">
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to login to your account
                </p>
              </div>
              <Controller
                name="login"
                control={control}
                rules={{
                  required: "This field is required",
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label="Email"
                    {...field}
                    error={error?.message}
                    disabled={isLoading}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "This field is required",
                }}
                render={({ field, fieldState: { error } }) => (
                  <PasswordField
                    label="Password"
                    {...field}
                    error={error?.message}
                    disabled={isLoading}
                  />
                )}
              />
              <Button>Submit</Button>
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?
                <a
                  href="/register"
                  className="underline underline-offset-4 ml-1"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://www.placecats.com/neo_banana/300/200"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Page;
