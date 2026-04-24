import {
  createSummaryBullet,
  deleteSummaryBullet,
  reorderSummaryBullets,
  updateSummaryBullet,
} from "@/api/summary";
import {
  Blocks,
  ResumeActions,
  ResumeFormInterface,
} from "@/types/ResumeTypes";
import { useForm, UseFormReturn } from "react-hook-form";
import { SetStateActionType } from "@/types/general";
import { AuthenticatedUser } from "@/types/session";
import { useState } from "react";

interface useCreateResumeHook {
  userData: AuthenticatedUser;
  resumeData?: ResumeFormInterface;
}

interface UseCreateResumeHookReturn {
  activeBlock: Blocks;
  setActiveBlock: SetStateActionType<Blocks>;
  formMethods: UseFormReturn<ResumeFormInterface>;
  onSubmit: (data: ResumeFormInterface) => void;
  resumeActions: ResumeActions;
  isBlockAvailable: (block: Blocks) => boolean;
}

const useCreateResumeHook = ({
  userData,
  resumeData,
}: useCreateResumeHook): UseCreateResumeHookReturn => {
  const [activeBlock, setActiveBlock] = useState<Blocks>("Profile");
  const formMethods = useForm<ResumeFormInterface>({
    defaultValues: {
      userId: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      contactEmail: userData.email,
      resumeTitle: userData.primaryRole || "",
      city: "",
      linkedinUrl: "",
      portfolioUrl: "",
      note: "",
      needsSponsorship: false,
      isPublic: false,
      status: "DRAFT",
      summary: {
        id: undefined,
        content: "Some default summary",
      },
      summaryBullets: [],
      ...resumeData,
      id: resumeData?.id,
    },
  });

  const onSubmit = async () => {};

  const resumeActions: ResumeActions = {
    summaryBullet: {
      createSummaryBullet: createSummaryBullet,
      updateSummaryBullet: updateSummaryBullet,
      deleteSummaryBullet: deleteSummaryBullet,
      reorderSummaryBullets: reorderSummaryBullets,
    },
  };

  const isBlockAvailable = (block: Blocks) => {
    const id = !!formMethods.getValues("id");

    if (id) {
      return true;
    }

    switch (block) {
      case "Education":
      case "Skills":
      case "Professional experience":
      case "Summary":
        return false;

      case "Profile":
        return true;

      default:
        return false;
    }
  };

  return {
    activeBlock,
    setActiveBlock,
    formMethods,
    onSubmit,
    resumeActions,
    isBlockAvailable,
  };
};

export default useCreateResumeHook;
