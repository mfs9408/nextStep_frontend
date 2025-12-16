import SummarySection from "@/components/ResumeBlocks/SummarySection";
import ProfileSection from "@/components/ResumeBlocks/ProfileSection";
import ResumeLeftSide from "@/views/CreateResumeView/ResumeLeftSide";
import ResumePageSwitcher from "@/components/ResumePageSwitcher";
import { useAutosaveResumeBlock } from "@/hooks/useAutosaveHook";
import { PROFILE_FIELDS } from "@/views/CreateResumeView/const";
import useCreateResumeHook from "@/hooks/useCreateResumeHook";
import { ResumeInterface } from "@/types/ResumeTypes";
import { AuthenticatedUser } from "@/types/session";
import { UseFormReturn } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

// interface CommonSectionProps {
//   formMethods: UseFormReturn<ResumeInterface>;
// }

interface CreateResumeViewProps {
  user: AuthenticatedUser;
  resumeData?: ResumeInterface;
}

const FIELDS_BY_BLOCK = {
  Profile: PROFILE_FIELDS,
} satisfies Record<string, readonly (keyof ResumeInterface)[]>;

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
      <h1 className="text-2xl">Create resume</h1>
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
