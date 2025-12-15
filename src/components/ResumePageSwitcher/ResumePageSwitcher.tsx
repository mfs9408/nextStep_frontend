import { BLOCKS } from "@/views/CreateResumeView/const";
import { SetStateActionType } from "@/types/general";
import { Button } from "@/components/ui/button";
import { Blocks } from "@/types/ResumeTypes";
import React from "react";

interface ResumePageSwitcherProps {
  activeBlock: Blocks;
  setActiveBlock: SetStateActionType<Blocks>;
}

const ResumePageSwitcher = ({
  activeBlock,
  setActiveBlock,
}: ResumePageSwitcherProps) => {
  const nextBlock = BLOCKS.indexOf(activeBlock) + 1;
  const prevBlock = BLOCKS.indexOf(activeBlock) - 1;

  return (
    <div className="flex justify-between pt-3">
      <div className="w-1/2 flex justify-start">
        {BLOCKS[prevBlock] && (
          <Button onClick={() => setActiveBlock(BLOCKS[prevBlock])}>
            {BLOCKS[prevBlock]}
          </Button>
        )}
      </div>
      <div className="w-1/2 flex justify-end">
        {BLOCKS[nextBlock] && (
          <Button onClick={() => setActiveBlock(BLOCKS[nextBlock])}>
            {BLOCKS[nextBlock]}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResumePageSwitcher;
