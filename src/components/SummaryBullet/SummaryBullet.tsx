import { Controller, FieldArrayWithId, UseFormReturn } from "react-hook-form";
import { ResumeFormInterface } from "@/types/ResumeTypes";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import TextField from "@/components/TextField";
import { GripVertical, X } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import React from "react";

interface SummaryBulletProps {
  index: number;
  item: FieldArrayWithId<ResumeFormInterface, "summaryBullets", "key">;
  isAddButtonVisible: boolean;
  formMethods: UseFormReturn<ResumeFormInterface>;
  removeField: (index: number, id: string) => void;
  addField: () => void;
}

const SummaryBullet = ({
  index,
  isAddButtonVisible,
  item,
  formMethods,
  removeField,
  addField,
}: SummaryBulletProps) => {
  const { control } = formMethods;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform?.toString(transform),
    transition,
  };

  return (
    <>
      <div
        key={item.key}
        className="flex gap-x-2"
        ref={setNodeRef}
        style={style}
      >
        <button
          {...attributes}
          {...listeners}
          ref={setActivatorNodeRef}
          draggable
          className="cursor-grab active:cursor-grabbing touch-none"
        >
          <GripVertical className="h-4 w-4 my-3 ml-3 mr-1 text-primary" />
        </button>
        <Controller
          control={control}
          name={`summaryBullets.${index}.content`}
          render={({ field }) => <TextField {...field} />}
        />
        {isAddButtonVisible && (
          <Button type="button" onClick={addField}>
            Add
          </Button>
        )}
        <div className="flex justify-center items-center">
          <Button
            aria-label="Remove"
            variant="ghost"
            className="rounded-full"
            onClick={async () => {
              if (!item.id) {
                toast.error("Summary bullet point is not removed yet");
                return;
              }
              removeField(index, item.id);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SummaryBullet;
