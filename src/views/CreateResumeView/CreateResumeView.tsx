import SummarySection from "@/components/ResumeBlocks/SummarySection";
import ProfileSection from "@/components/ResumeBlocks/ProfileSection";
import ResumeLeftSide from "@/views/CreateResumeView/ResumeLeftSide";
import ResumePageSwitcher from "@/components/ResumePageSwitcher";
import useCreateResumeHook from "@/hooks/useCreateResumeHook";
import { Blocks, ResumeInterface } from "@/types/ResumeTypes";
import { AuthenticatedUser } from "@/types/session";
import { UseFormReturn } from "react-hook-form";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CommonSectionProps {
  formMethods: UseFormReturn<ResumeInterface>;
}

interface CreateResumeViewProps {
  user: AuthenticatedUser;
  resumeData?: ResumeInterface;
}

const CreateResumeView = ({ user, resumeData }: CreateResumeViewProps) => {
  const [activeBlock, setActiveBlock] = useState<Blocks>("Profile");
  const { formMethods, onSubmit } = useCreateResumeHook({
    userData: user,
    resumeData,
  });
  const { handleSubmit } = formMethods;

  return (
    <form
      className="flex flex-col flex-1 gap-y-5 min-h-0 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl">Create resume</h1>
      <Card className="flex flex-1 flex-row min-h-0 w-full p-8">
        <div className={cn("lg:flex h-full w-1/5 border-r", "hidden")}>
          <ResumeLeftSide
            activeBlock={activeBlock}
            setActiveBlock={setActiveBlock}
          />
        </div>
        <div className={cn("flex flex-1 flex-col min-h-0 w-full md:w-4/5")}>
          <div className="flex flex-1 flex-col min-h-0 w-full">
            {activeBlock === "Profile" && (
              <ProfileSection formMethods={formMethods} />
            )}
            {activeBlock === "Summary" && <SummarySection />}
          </div>
          <ResumePageSwitcher
            activeBlock={activeBlock}
            setActiveBlock={setActiveBlock}
          />
        </div>
      </Card>
    </form>
  );
};

export default CreateResumeView;
