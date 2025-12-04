"use client";
import AuthWrapper from "@/components/AuthWrapper/AuthWrapper";
import PasswordField from "@/components/PasswordField";
import { Controller, useForm } from "react-hook-form";
import { LoginInterface } from "@/types/auth/auth";
import { Button } from "@/components/ui/button";
import TextField from "@/components/TextField";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Route } from "@/enums/route";
import { login } from "@/api/auth";
import { AxiosError } from "axios";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm<LoginInterface>({
    defaultValues: { email: "foo@gmail.com", password: "123456" },
  });

  const onSubmit = async (data: LoginInterface) => {
    setIsLoading(true);
    await login({
      email: data.email,
      password: data.password,
    })
      .then(() => router.push(Route.DASHBOARD))
      .catch(
        (
          error: AxiosError<{
            statusCode: number;
            message: string;
          }>,
        ) => {
          toast.error(error?.response?.data.message || "Unable to login");
        },
      );
    setIsLoading(false);
  };

  return (
    <AuthWrapper
      image={
        <img
          src="https://www.placecats.com/neo_banana/300/200"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      }
    >
      <form
        className="flex flex-1 items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full max-w-xs">
          <div className="flex gap-y-4 flex-col">
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your email below to login to your account
              </p>
            </div>
            <Controller
              name="email"
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
                href={Route.REGISTER}
                className="underline underline-offset-4 ml-1"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default Page;
