import { CommonSectionProps } from "@/types/ResumeTypes";
import { Separator } from "@/components/ui/separator";
import TextField from "@/components/TextField";
import { Controller } from "react-hook-form";
import React from "react";

type ProfileSectionProps = CommonSectionProps;

export default function ProfileSection({
  formMethods: { control },
}: ProfileSectionProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Profile</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Basic resume details and contact information.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <div>
            <h3 className="text-base font-semibold">Resume info</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Name your resume so you can quickly find it later.
            </p>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Controller
              name="resumeTitle"
              rules={{ required: "This field is required" }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Resume title"
                  placeholder="Frontend developer"
                  containerClassName="w-full"
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              name="note"
              rules={{ required: "This field is required" }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Resume note"
                  placeholder="Resume for designer position from 05/01 for Catflix"
                  containerClassName="w-full"
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
        </section>
        <Separator />
        <section>
          <div>
            <h3 className="text-base font-semibold">Personal info</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              This information appears at the top of your resume.
            </p>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Controller
              name="firstName"
              rules={{ required: "This field is required" }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="First name"
                  placeholder="John"
                  containerClassName="w-full"
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              rules={{ required: "This field is required" }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Last name"
                  placeholder="Doe"
                  containerClassName="w-full"
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              name="contactEmail"
              rules={{ required: "This field is required" }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Email"
                  placeholder="john_doe@gmail.com"
                  containerClassName="w-full"
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              name="phone"
              rules={{ required: "This field is required" }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Phone"
                  placeholder="347 123 4567"
                  containerClassName="w-full"
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              name="city"
              rules={{ required: "This field is required" }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="City"
                  placeholder="New York"
                  containerClassName="w-full"
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
        </section>
        <Separator />
        <section>
          <div>
            <h3 className="text-base font-semibold">Links</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Optional, but helps recruiters learn more about you.
            </p>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Controller
              name="portfolioUrl"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Portfolio"
                  placeholder="https://catflix.com"
                  containerClassName="w-full"
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              name="linkedinUrl"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="LinkedIn"
                  placeholder="https://linkedin.com/in/john-doe"
                  containerClassName="w-full"
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
