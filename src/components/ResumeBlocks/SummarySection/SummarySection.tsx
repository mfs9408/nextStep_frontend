import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { commonEditorConfig } from "@/components/EditorField/editorConfig";
import { useSummarySectionHook } from "@/hooks/useSummarySectionHook";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { CommonSectionProps } from "@/types/ResumeTypes";
import SummaryBullet from "@/components/SummaryBullet";
import EditorField from "@/components/EditorField";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import React from "react";

type SummarySectionProps = CommonSectionProps;

const SummarySection = ({
  formMethods,
  resumeActions,
}: SummarySectionProps) => {
  const { sensors, addField, removeField, handleDragEnd, fields } =
    useSummarySectionHook({
      formMethods,
      resumeActions,
    });
  const { control } = formMethods;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Summary</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your summary</p>
      </div>
      <div className="space-y-10">
        <section>
          <div className="mb-2">
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
        </section>
        <section>
          <div className="flex flex-col gap-y-4">
            <div>
              <h3 className="text-base font-semibold">Summary bullet points</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Provide a short information about yourself and achievements.
              </p>
            </div>
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
                    isGrabButtonVisible={fields.length > 1}
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
