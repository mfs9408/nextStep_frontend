import React, { InputHTMLAttributes, ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  description?: string;
  errorMessage?: string;
  containerClassName?: string;
  disabled?: boolean;
}

const TextField = ({
  label,
  containerClassName,
  disabled,
  errorMessage,
  className,
  leftIcon,
  rightIcon,
  type = "text",
  onBlur,
  ...props
}: TextFieldProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={cn(
        "h-auto w-full flex flex-col gap-y-1",
        containerClassName,
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      <div
        className={cn(
          "relative w-full flex items-center border border-input rounded-md bg-primary-foreground transition-all focus-within:ring-2 focus-within:ring-chart-1 focus-within:border-chart-1",
          className,
          errorMessage &&
            "border-destructive focus-within:ring-destructive focus-within:border-destructive",
        )}
      >
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {leftIcon}
          </div>
        )}
        <Input
          id={label}
          type={type}
          disabled={disabled}
          onFocus={() => {
            !disabled && setFocused(true);
          }}
          onBlur={(event) => {
            onBlur && onBlur(event);
            !disabled && setFocused(false);
          }}
          className={cn(
            "h-8.5 peer flex-1 bg-transparent text-sm outline-none p-3 transition-all placeholder:text-muted-foreground border-none",
            leftIcon ? "pl-8" : "pl-3",
            rightIcon ? "pr-10" : "pr-3",
            disabled && "cursor-not-allowed opacity-50",
            errorMessage &&
              "border-destructive focus:border-destructive focus:ring-destructive",
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
        {label && (
          <label
            htmlFor={label}
            onMouseDown={(e) => e.preventDefault()}
            className={cn(
              "absolute left-2 px-1 font-medium text-xs transition-all bg-primary-foreground cursor-text",
              leftIcon ? "left-8" : "left-2",
              focused || props.value
                ? "text-xs -top-0.5 left-2 w-auto -translate-y-1/2"
                : "text-sm top-1/2 text-muted-foreground -translate-y-1/2 w-[90%]",
              focused ? "text-chart-1" : "text-muted-foreground",
              disabled && "cursor-not-allowed",
              errorMessage && "text-destructive",
            )}
          >
            {label}
          </label>
        )}
      </div>
      {errorMessage && (
        <div className="w-full">
          <p className="text-xs text-destructive">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default TextField;
