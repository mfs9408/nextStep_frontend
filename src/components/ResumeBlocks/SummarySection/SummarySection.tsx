import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { commonEditorConfig } from "@/components/EditorField/editorConfig";
import { Controller, useFieldArray } from "react-hook-form";
import { CommonSectionProps } from "@/types/ResumeTypes";
import SummaryBullet from "@/components/SummaryBullet";
import EditorField from "@/components/EditorField";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React from "react";

type SummarySectionProps = CommonSectionProps;

const SummarySection = ({
  formMethods,
  resumeActions,
}: SummarySectionProps) => {
  const { control, getValues } = formMethods;
  const { fields, append, remove, move, insert } = useFieldArray({
    control,
    name: "summaryBullets",
    keyName: "key",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const addField = async () => {
    const summaryId = getValues("summary.id");

    if (!summaryId) {
      toast.error("Summary is not saved yet");
      return;
    }

    const order = fields.length + 1;
    const defaultContent = "Summary bullet point #" + order + "";

    await resumeActions.summaryBullet
      .createSummaryBullet({
        summaryId,
        order,
        content: defaultContent,
      })
      .then((item) => {
        append(item);
      })
      .catch(() => {
        toast.error("Failed to create summary bullet point");
        remove(order);
      });
  };

  const removeField = async (index: number, id: string | undefined) => {
    if (!id) {
      toast.error("Failed to delete summary bullet point");
      return;
    }
    const hashedData = fields[index];

    remove(index);
    await resumeActions.summaryBullet.deleteSummaryBullet(id).catch(() => {
      insert(hashedData.order, hashedData);
      toast.error("Failed to delete summary bullet point");
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      const activeIndex = active.data.current?.sortable?.index;
      const overIndex = over.data.current?.sortable?.index;
      if (activeIndex !== undefined && overIndex !== undefined) {
        move(activeIndex, overIndex);
      }
    }

    const ids = getValues("summaryBullets").map((item) => item.id);
    const summaryId = formMethods.getValues("summary.id");

    if (!summaryId) {
      toast.error("Summary is not saved yet");
      return;
    }

    resumeActions.summaryBullet.reorderSummaryBullets({
      idsInOrder: ids,
      summaryId,
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Summary</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your summary</p>
      </div>
      <div className="space-y-10">
        <section>
          <div>
            <h3 className="text-base font-semibold">Your summary</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Provide a short information about yourself and your work history.
            </p>
          </div>
          <div>
            <Controller
              name="summary.content"
              rules={{ required: "This field is required" }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <EditorField
                  value={field.value}
                  onChange={(value) => {
                    if (!value.TEXT) {
                      field.onChange("");
                      return;
                    }
                    field.onChange(value.HTML);
                  }}
                  editorConfig={commonEditorConfig({
                    placeholder: "Put your text",
                  })}
                  containerClassName="flex-1 w-full min-h-0"
                  className="h-full"
                  error={error?.message}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="text-md">Summary bullet points</h3>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields}
                strategy={verticalListSortingStrategy}
              >
                {fields.length === 0 && (
                  <Button
                    aria-label="Add field"
                    variant="outline"
                    onClick={addField}
                  >
                    Add a bullet point
                  </Button>
                )}
                {fields.map((item, index) => (
                  <SummaryBullet
                    key={item.key}
                    index={index}
                    item={item}
                    isAddButtonVisible={fields.length - 1 == index}
                    formMethods={formMethods}
                    removeField={removeField}
                    addField={addField}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SummarySection;
