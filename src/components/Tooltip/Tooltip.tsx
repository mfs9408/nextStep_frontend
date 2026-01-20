import {
  TooltipTrigger,
  Tooltip as ShadCnTooltip,
  TooltipContent,
} from "@/components/ui/tooltip";
import React, { PropsWithChildren } from "react";

interface TooltipProps extends PropsWithChildren {
  label: string;
}

const Tooltip = ({ children, label }: TooltipProps) => {
  return (
    <ShadCnTooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </ShadCnTooltip>
  );
};

export default Tooltip;
