import * as React from "react";

import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  selectGroup: {
    value: string;
    label: string;
  }[];
  containerClassName?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  description?: string;
  leftText?: React.ReactNode;
}

const Select = ({
  value,
  onChange,
  selectGroup,
  label,
  placeholder,
  containerClassName,
  disabled,
  errorMessage,
  leftText,
  description,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (value: string) => {
    if (!disabled) {
      onChange(value);
    }
  };

  return (
    <div className={cn("w-full h-9", containerClassName)}>
      <div className={cn("relative w-full ")}>
        {label && (
          <label
            htmlFor={label}
            onClick={() => setIsOpen(true)}
            className={cn(
              "absolute left-2 px-1 font-medium text-xs transition-all bg-primary-foreground cursor-pointer",
              isOpen || value
                ? " text-xs top-0 left-2 w-auto -translate-y-1/2"
                : "text-sm top-1/2 -translate-y-1/2 w-[90%]",
              isOpen ? "text-chart-1" : "text-muted-foreground",
              disabled && "cursor-not-allowed opacity-50",
              !!errorMessage && "text-destructive",
            )}
          >
            {label}
          </label>
        )}
        <ShadcnSelect
          value={value}
          onValueChange={handleChange}
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <SelectTrigger
            id={label}
            disabled={disabled}
            className={cn(
              "text-bold border bg-inherit text-sm w-full transition-all cursor-pointer",
              "border-input focus:ring-2 focus:ring-chart-1 focus:border-chart-1",
              "data-[state=open]:ring-2 data-[state=open]:ring-chart-1 data-[state=open]:border-chart-1",
              !!errorMessage &&
                "border-destructive focus:border-destructive focus:ring-destructive data-[state=open]:ring-destructive data-[state=open]:border-destructive",
            )}
          >
            {leftText}
            <SelectValue
              placeholder={placeholder}
              className={cn(
                "text-sm font-light data-[placeholder]:text-muted-foreground w-full justify-center",
              )}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {placeholder && <SelectLabel>{placeholder}</SelectLabel>}
              {selectGroup.map(({ value, label }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="cursor-pointer"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </ShadcnSelect>
      </div>
      {errorMessage && (
        <p className="text-destructive text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default Select;
