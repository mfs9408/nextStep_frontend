import { useForm, UseFormReturn } from "react-hook-form";
import { ResumeInterface } from "@/types/ResumeTypes";
import { AuthenticatedUser } from "@/types/session";
import { createResume } from "@/api/resume";
import { toast } from "sonner";

interface useCreateResumeHook {
  userData: AuthenticatedUser;
  resumeData?: ResumeInterface;
}

interface UseCreateResumeHookReturn {
  formMethods: UseFormReturn<ResumeInterface>;
  onSubmit: (data: ResumeInterface) => void;
}

const useCreateResumeHook = ({
  userData,
  resumeData,
}: useCreateResumeHook): UseCreateResumeHookReturn => {
  const formMethods = useForm<ResumeInterface>({
    defaultValues: {
      userId: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      contactEmail: userData.email,
      resumeTitle: userData.primaryRole || '',
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

  const onSubmit = async (data: ResumeInterface) => {
    // await createResume(data)
    //   .then(() => {
    //     toast.success("Resume created successfully");
    //   })
    //   .catch((err) => {
    //     toast.error(err.message);
    //     console.log(err);
    //   });
  };

  return { formMethods, onSubmit };
};

export default useCreateResumeHook;
