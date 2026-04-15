import {
  createSummary,
  createSummaryBullet,
  deleteSummaryBullet,
  reorderSummaryBullets,
  updateSummary,
  updateSummaryBullet,
} from "@/api/summary";
import {
  Blocks,
  ResumeActions,
  ResumeFormInterface,
} from "@/types/ResumeTypes";
import { PROFILE_FIELDS } from "@/views/CreateResumeView/const";
import { useForm, UseFormReturn } from "react-hook-form";
import { SetStateActionType } from "@/types/general";
import { AuthenticatedUser } from "@/types/session";
import { useState } from "react";
import { toast } from "sonner";

interface useCreateResumeHook {
  userData: AuthenticatedUser;
  resumeData?: ResumeFormInterface;
}

interface UseCreateResumeHookReturn {
  activeBlock: Blocks;
  setActiveBlock: SetStateActionType<Blocks>;
  formMethods: UseFormReturn<ResumeFormInterface>;
  onSubmit: (data: ResumeFormInterface) => void;
  validateCurrentBlockData: () => Promise<boolean>;
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

  const validateCurrentBlockData = async () => {
    const isValidated = formMethods.trigger(PROFILE_FIELDS);

    return isValidated;
  };

  const onSubmit = async (data: ResumeFormInterface) => {
    // saveProfile();
    // if (!data.id) {
    //   await createResume(data)
    //     .then((data) => {
    //       formMethods.setValue("id", data.id);
    //     })
    //     .catch((err) => {
    //       toast.error(err.message);
    //     });
    //
    //   return;
    // }
    //
    // console.log("update");
    //
    // await updateResume(data).catch((err) => {
    //   toast.error(err.message);
    // });
  };

  const saveProfile = async () => {
    // const resumeId = formMethods.getValues("id");
    const full = formMethods.getValues();

    // if (!resumeId) {
    //   await createResume(payload)
    //     .then((data) => {
    //       formMethods.setValue("id", data.id);
    //     })
    //     .catch((err) => {
    //       toast.error(err.message);
    //     });
    //
    //   const resumeId = formMethods.getValues("id");
    //   if (!resumeId) return;
    //   await createSummary({ content: "", resumeId: resumeId })
    //     .then((data) => {
    //       formMethods.setValue("summary.id", data.id);
    //     })
    //     .catch((err) => {
    //       toast.error(err.message);
    //     });
    //
    //   return;
    // }
    //
    // await updateResume(payload).catch((err) => {
    //   toast.error(err.message);
    // });
  };

  const saveSummary = async () => {
    const summary = formMethods.getValues("summary");
    const resumeId = formMethods.getValues("id");
    if (!summary.id && resumeId) {
      await createSummary({ content: "", resumeId })
        .then((data) => {
          formMethods.setValue("summary.id", data.id);
        })
        .catch((err) => {
          toast.error(err.message);
        });

      return;
    }

    await updateSummary(summary).catch((err) => {
      toast.error(err.message);
    });
  };

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
    validateCurrentBlockData,
    resumeActions,
    isBlockAvailable,
  };
};

export default useCreateResumeHook;
