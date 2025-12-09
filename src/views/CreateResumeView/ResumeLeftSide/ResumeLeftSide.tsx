import { BLOCKS } from "@/views/CreateResumeView/const";
import { SetStateActionType } from "@/types/general";
import { Blocks } from "@/types/ResumeTypes";
import { cn } from "@/lib/utils";
import React from "react";

interface ResumeLeftSideProps {
  activeBlock: Blocks;
  setActiveBlock: SetStateActionType<Blocks>;
}

const ResumeLeftSide = ({
  activeBlock,
  setActiveBlock,
}: ResumeLeftSideProps) => {
  return (
    <div className="flex flex-col gap-y-2 w-full h-full">
      {BLOCKS.map((block, index) => (
        <p
          key={index}
          className={cn(
            "text-md text-primary-black cursor-pointer",
            activeBlock === block && "font-bold",
          )}
          onClick={() => setActiveBlock(block)}
        >
          {block}
        </p>
      ))}
    </div>
  );
};

export default ResumeLeftSide;
