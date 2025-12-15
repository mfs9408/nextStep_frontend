import { CommonSectionProps } from "@/types/ResumeTypes";
import TextField from "@/components/TextField";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import React from "react";

type ProfileSectionProps = CommonSectionProps;

const ProfileSection = ({ formMethods: { control } }: ProfileSectionProps) => {
  return (
    <div className="flex flex-1 min-h-0 w-full gap-y-2 p-1 flex-col overflow-auto">
      <h2 className="text-2xl">Profile</h2>
      <div className={cn("flex gap-2", "flex-col")}>
        <Controller
          name="note"
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Resume note"
              placeholder="Resume for designer position from 05/01 for Catflix"
              containerClassName="w-2/3"
              error={error?.message}
            />
          )}
          control={control}
        />
        <Controller
          name="resumeTitle"
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Resume title"
              placeholder="Frontend developer"
              containerClassName="w-1/2"
              error={error?.message}
            />
          )}
          control={control}
        />
      </div>
      <div className={cn("flex gap-2 md:flex-row", "flex-col")}>
        <Controller
          name="firstName"
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="First Name"
              placeholder="John"
              containerClassName="w-full"
              error={error?.message}
            />
          )}
          control={control}
        />
        <Controller
          name="lastName"
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Last Name"
              placeholder="Doe"
              containerClassName="w-full"
              error={error?.message}
            />
          )}
          control={control}
        />
      </div>
      <div className={cn("flex gap-2 md:flex-row", "flex-col")}>
        <Controller
          name="phone"
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Your phone number"
              placeholder="347123456"
              containerClassName="w-1/2"
              error={error?.message}
            />
          )}
          control={control}
        />
        <Controller
          name="city"
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="City"
              placeholder="New York"
              containerClassName="w-1/2"
              error={error?.message}
            />
          )}
          control={control}
        />
      </div>
      <div className={cn("flex gap-2 md:flex-row", "flex-col")}>
        <Controller
          name="contactEmail"
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Your email"
              placeholder="john_doe@gmail.com"
              containerClassName="w-1/2"
              error={error?.message}
            />
          )}
          control={control}
        />
      </div>
      <div className={cn("flex gap-2", "flex-col")}>
        <Controller
          name="portfolioUrl"
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Your portfolio URL"
              placeholder="www.catflix.com"
              containerClassName="w-full"
              error={error?.message}
            />
          )}
          control={control}
        />
        <Controller
          name="linkedinUrl"
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="LinkedIn"
              placeholder="https://www.linkedin.com/in/jon-doe/"
              containerClassName="w-full"
              error={error?.message}
            />
          )}
          control={control}
        />
      </div>
    </div>
  );
};

export default ProfileSection;
