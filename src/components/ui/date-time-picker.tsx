import { format } from "date-fns";
import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  error?: string | boolean;
}

export function DatePicker({ value, onChange, error }: DatePickerProps) {
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-label="Open calendar"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-destructive",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown-buttons"
            selected={value}
            onSelect={onChange}
            fromYear={1900}
            toYear={2025}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && (
        <div className="w-full">
          <p className="text-xs text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
}
