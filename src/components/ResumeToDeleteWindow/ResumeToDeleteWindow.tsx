import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ResumeToDelete } from "@/views/YourResumesView/your-resumes-type";
import { SetStateActionType } from "@/types/general";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import React, { useState } from "react";

interface ResumeToDeleteWindowProps {
  state: boolean;
  setState: SetStateActionType<ResumeToDelete | null>;
  resumeData: ResumeToDelete;
  onDelete: (id: string) => void;
}

const ResumeToDeleteWindow = ({
  state,
  setState,
  resumeData,
  onDelete,
}: ResumeToDeleteWindowProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const onDialogClose = () => {
    setState(null);
  };

  const onDeleteResume = async () => {
    try {
      setIsLoading(true);
      await onDelete(resumeData.id);
      onDialogClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={state} onOpenChange={onDialogClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete resume</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete resume:
            <span className="font-bold">
              {" "}
              {resumeData.name || "Untitled resume"}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4"></div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              size="sm"
              variant="outline"
              onClick={onDialogClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="sm"
            variant="destructive"
            disabled={isLoading}
            onClick={onDeleteResume}
          >
            {isLoading ? <Spinner /> : "Delete resume"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeToDeleteWindow;
