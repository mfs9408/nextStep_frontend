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

interface SelectProps {
  selectedItem: string;
  setSelectedValue: (value: string) => void;
  selectGroup: {
    value: string;
    label: string;
  }[];
  className?: string;
  label?: string;
  placeholder?: string;
}

const Select = ({
  selectGroup,
  selectedItem,
  label,
  placeholder,
  setSelectedValue,
  className,
}: SelectProps) => {
  return (
    <ShadcnSelect value={selectedItem} onValueChange={setSelectedValue}>
      <SelectTrigger className={cn(className, "cursor-pointer min-w-10!")}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          {selectGroup.map(({ value, label }) => (
            <SelectItem key={value} value={value} className="cursor-pointer">
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </ShadcnSelect>
  );
};

export default Select;
