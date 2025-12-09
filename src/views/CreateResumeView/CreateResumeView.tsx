import ResumeLeftSide from "@/views/CreateResumeView/ResumeLeftSide";
import { SessionUser } from "@/types/session";
import { Blocks } from "@/types/ResumeTypes";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CreateResumeViewProps {
  user: SessionUser | undefined;
}

const CreateResumeView = ({}: CreateResumeViewProps) => {
  const [activeBlock, setActiveBlock] = useState<Blocks>("Heading");

  return (
    <form
      className="flex flex-col flex-1 gap-y-5 min-h-0 w-full"
      // onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl">Create resume</h1>
      <Card className="flex flex-1 flex-row min-h-0 w-full p-8">
        <div className={cn("lg:flex h-full w-1/5 border-r", "hidden")}>
          <ResumeLeftSide
            activeBlock={activeBlock}
            setActiveBlock={setActiveBlock}
          />
        </div>
        <div className={cn("flex flex-1 flex-col min-h-0 md:w-4/5", "w-full")}>
          foo
        </div>
      </Card>
    </form>
  );
};

export default CreateResumeView;
