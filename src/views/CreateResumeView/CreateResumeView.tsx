import { PROFILE_FIELDS, SUMMARY_FIELDS } from "@/views/CreateResumeView/const";
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

const FIELDS_BY_BLOCK = {
  Profile: PROFILE_FIELDS,
  Summary: SUMMARY_FIELDS,
} satisfies Record<string, readonly (keyof ResumeFormInterface)[]>;

const CreateResumeView = ({ user, resumeData }: CreateResumeViewProps) => {
  const { activeBlock, setActiveBlock, formMethods, onSubmit } =
    useCreateResumeHook({
      userData: user,
      resumeData,
    });

  const { handleSubmit } = formMethods;

  const { autosaveStatus } = useAutosaveResumeBlock({
    formMethods,
    activeBlock,
    fieldsByBlock: FIELDS_BY_BLOCK,
    onSubmit,
    debounceMs: 900,
    enabled: true,
  });

  return (
    <form
      className="flex flex-col flex-1 gap-y-5 min-h-0 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl">
        {resumeData?.id ? "Update" : "Create"} resume
      </h1>
      <Card className="flex flex-1 flex-row min-h-0 w-full p-8">
        <div className={cn("lg:flex h-full w-1/5 border-r", "hidden")}>
          <ResumeLeftSide
            autosaveStatus={autosaveStatus}
            activeBlock={activeBlock}
            setActiveBlock={setActiveBlock}
          />
        </div>
        <div className={cn("flex flex-1 flex-col min-h-0 w-full md:w-4/5")}>
          <div className="flex flex-1 flex-col min-h-0 w-full">
            {activeBlock === "Profile" && (
              <ProfileSection formMethods={formMethods} />
            )}
            {activeBlock === "Summary" && (
              <SummarySection formMethods={formMethods} />
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
