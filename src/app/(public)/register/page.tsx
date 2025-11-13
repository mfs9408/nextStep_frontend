"use client";
import AuthWrapper from "@/components/AuthWrapper/AuthWrapper";
import { CreateUserInterface } from "@/types/auth/auth";
import PasswordField from "@/components/PasswordField";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import TextField from "@/components/TextField";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Route } from "@/enums/route";
import { register } from "@/api/auth";
import { AxiosError } from "axios";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm<CreateUserInterface>({
    defaultValues: {
      email: "",
      password: "",
      lastName: "",
      firstName: "",
      phone: "",
      primaryRole: "",
    },
  });

  const onSubmit = async (data: CreateUserInterface) => {
    setIsLoading(true);
    await register(data)
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
              <h1 className="text-2xl font-bold">Sign up</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your email below to create an account
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
                minLength: {
                  message: "Minimum length is 6 symbols",
                  value: 6,
                },
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
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="First Name"
                  {...field}
                  error={error?.message}
                  disabled={isLoading}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Last Name"
                  {...field}
                  error={error?.message}
                  disabled={isLoading}
                />
              )}
            />
            <Controller
              name="primaryRole"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Your Primary Role"
                  {...field}
                  error={error?.message}
                  disabled={isLoading}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Your Phone Number"
                  {...field}
                  error={error?.message}
                  disabled={isLoading}
                />
              )}
            />
            <Button>Submit</Button>
            <p className="text-sm text-muted-foreground">
              Already have an account?
              <a href="/register" className="underline underline-offset-4 ml-1">
                Sign in!
              </a>
            </p>
          </div>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default Page;
