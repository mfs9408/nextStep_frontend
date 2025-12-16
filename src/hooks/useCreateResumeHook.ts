import { PROFILE_FIELDS } from "@/views/CreateResumeView/const";
import { Blocks, ResumeInterface } from "@/types/ResumeTypes";
import { createResume, updateResume } from "@/api/resume";
import { useForm, UseFormReturn } from "react-hook-form";
import { SetStateActionType } from "@/types/general";
import { AuthenticatedUser } from "@/types/session";
import { useState } from "react";
import { toast } from "sonner";

interface useCreateResumeHook {
  userData: AuthenticatedUser;
  resumeData?: ResumeInterface;
}

interface UseCreateResumeHookReturn {
  activeBlock: Blocks;
  setActiveBlock: SetStateActionType<Blocks>;
  formMethods: UseFormReturn<ResumeInterface>;
  onSubmit: (data: ResumeInterface) => void;
  validateCurrentBlockData: () => Promise<boolean>;
}

const useCreateResumeHook = ({
  userData,
  resumeData,
}: useCreateResumeHook): UseCreateResumeHookReturn => {
  const [activeBlock, setActiveBlock] = useState<Blocks>("Profile");
  const formMethods = useForm<ResumeInterface>({
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
      ...resumeData,
      id: resumeData?.id,
    },
  });

  const validateCurrentBlockData = async () => {
    const isValidated = formMethods.trigger(PROFILE_FIELDS);

    return isValidated;
  };

  const onSubmit = async (data: ResumeInterface) => {
    if (!data.id) {
      await createResume(data)
        .then((data) => {
          formMethods.setValue("id", data.id);
        })
        .catch((err) => {
          toast.error(err.message);
        });

      return;
    }

    await updateResume(data).catch((err) => {
      toast.error(err.message);
    });
  };

  return {
    activeBlock,
    setActiveBlock,
    formMethods,
    onSubmit,
    validateCurrentBlockData,
  };
};

export default useCreateResumeHook;
