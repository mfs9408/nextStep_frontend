import React, { InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean | string;
  containerClassName?: string;
}

const TextField = ({
  error,
  label,
  containerClassName,
  ...props
}: TextFieldProps) => {
  return (
    <div className={cn("flex flex-col gap-y-1 w-auto", containerClassName)}>
      {label && <p className="text-xs text-foreground">{label}</p>}
      <Input
        className={cn(
          error &&
            "border-destructive focus:border-destructive focus:ring-destructive focus-visible:ring-destructive focus-visible:border-destructive",
        )}
        {...props}
      />
      {error && (
        <div className="w-full">
          <p className="text-xs text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
};

export default TextField;
