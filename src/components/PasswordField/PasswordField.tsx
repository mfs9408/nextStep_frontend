import React, { InputHTMLAttributes, useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react"; // optional, if you want eye toggle
import { cn } from "@/lib/utils";

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean | string;
  containerClassName?: string;
}

const PasswordField = ({
  error,
  label,
  containerClassName,
  ...props
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-y-1 w-auto", containerClassName)}>
      {label && <p className="text-xs text-foreground">{label}</p>}
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            error &&
              "border-destructive focus:border-destructive focus:ring-destructive focus-visible:ring-destructive focus-visible:border-destructive",
          )}
          {...props}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <div className="w-full">
          <p className="text-xs text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
};

export default PasswordField;
