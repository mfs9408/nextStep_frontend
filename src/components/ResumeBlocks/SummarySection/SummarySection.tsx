import { CommonSectionProps } from "@/types/ResumeTypes";
import EditorField from "@/components/EditorField";
import TextField from "@/components/TextField";
import { Controller } from "react-hook-form";
import React from "react";

type SummarySectionProps = CommonSectionProps;

const SummarySection = ({ formMethods: { control } }: SummarySectionProps) => {
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
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Controller
              name="summary"
              rules={{ required: "This field is required" }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Resume title"
                  placeholder="Frontend developer"
                  containerClassName="w-full"
                  error={error?.message}
                />
              )}
            />
            {/*<Controller*/}
            {/*  name="summary"*/}
            {/*  rules={{*/}
            {/*    required: "This field is required",*/}
            {/*  }}*/}
            {/*  render={({*/}
            {/*    field: { value, onChange },*/}
            {/*    fieldState: { error },*/}
            {/*  }) => (*/}
            {/*    <EditorField*/}
            {/*      label="Summary"*/}
            {/*      value={value}*/}
            {/*      onChange={(value) => {*/}
            {/*        if (!value.TEXT) {*/}
            {/*          return;*/}
            {/*        }*/}

            {/*        onChange(value.HTML);*/}
            {/*      }}*/}
            {/*      // onAiClick={(data) =>*/}
            {/*      //   setAiData &&*/}
            {/*      //   setAiData({*/}
            {/*      //     value: data?.value || "",*/}
            {/*      //     name: "summary",*/}
            {/*      //     type: AIType.SUMMARY,*/}
            {/*      //   })*/}
            {/*      // }*/}
            {/*      // editorConfig={commonEditorConfig({*/}
            {/*      //   placeholder: ALL_TEXT_DESCRIPTIONS.resume.summary.summary,*/}
            {/*      // })}*/}
            {/*      error={error?.message}*/}
            {/*    />*/}
            {/*  )}*/}
            {/*  control={control}*/}
            {/*/>*/}
            {/*<SummaryBullets control={control} setAiData={setAiData} />*/}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SummarySection;
