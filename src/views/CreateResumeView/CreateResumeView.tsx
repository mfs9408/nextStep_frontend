import SummarySection from "@/components/ResumeBlocks/SummarySection";
import ProfileSection from "@/components/ResumeBlocks/ProfileSection";
import ResumeLeftSide from "@/views/CreateResumeView/ResumeLeftSide";
import ResumePageSwitcher from "@/components/ResumePageSwitcher";
import { useAutosaveResumeBlock } from "@/hooks/useAutosaveHook";
import useCreateResumeHook from "@/hooks/useCreateResumeHook";
import { ResumeFormInterface } from "@/types/ResumeTypes";
import { AuthenticatedUser } from "@/types/session";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface CreateResumeViewProps {
  user: AuthenticatedUser;
  resumeData?: ResumeFormInterface;
}

const CreateResumeView = ({ user, resumeData }: CreateResumeViewProps) => {
  const { activeBlock, setActiveBlock, formMethods, onSubmit, resumeActions } =
    useCreateResumeHook({
      userData: user,
      resumeData,
    });

  const { handleSubmit } = formMethods;

  const { autosaveStatus } = useAutosaveResumeBlock({
    formMethods,
    debounceMs: 900,
    enabled: true,
    resumeActions,
  });

  return (
    <form
      className="flex flex-col flex-1 gap-y-5 min-h-0 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {resumeData?.id ? "Update" : "Create"} resume
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create, edit, and keep track of your resume versions.
        </p>
      </div>
      <Card className="flex flex-1 flex-row min-h-0 w-full p-8">
        <div className={cn("lg:flex h-full w-1/5 border-r min-h-0", "hidden")}>
          <ResumeLeftSide
            autosaveStatus={autosaveStatus}
            activeBlock={activeBlock}
            setActiveBlock={setActiveBlock}
          />
        </div>
        <div className={cn("flex flex-1 flex-col min-h-0 w-full md:w-4/5")}>
          <div className="flex flex-1 flex-col min-h-0 w-full">
            {activeBlock === "Profile" && (
              <ProfileSection
                formMethods={formMethods}
                resumeActions={resumeActions}
              />
            )}
            {activeBlock === "Summary" && (
              <SummarySection
                formMethods={formMethods}
                resumeActions={resumeActions}
              />
            )}
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
