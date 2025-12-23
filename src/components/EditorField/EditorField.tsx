import React, { useState, useRef, useEffect, useMemo } from "react";
import EditorToolbar from "@/components/EditorField/EditorToolbar";
import { EditorContent, useEditor } from "@tiptap/react";
import { EditorOptions } from "@tiptap/core";
import { cn } from "@/lib/utils";

interface EditorProps {
  value: string;
  onChange: (value: { HTML: string; TEXT: string }) => void;
  editorConfig: Partial<EditorOptions> & { placeholder?: string };
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  error?: boolean | string;
  label?: string;
  onAiClick?: (data: unknown | undefined) => void;
}

const ResumeEditorField = React.memo(
  ({
    value,
    onChange,
    onAiClick,
    editorConfig,
    className,
    containerClassName,
    error,
    label,
  }: EditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const config = useMemo(() => editorConfig, []);

    const editor = useEditor({
      ...config,
      content: value || "",
      onBlur: ({ editor }) => {
        onChange({ HTML: editor.getHTML(), TEXT: editor.getText() });
      },
    });

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          editorRef.current &&
          !editorRef.current.contains(event.target as Node)
        ) {
          setIsFocused(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    useEffect(() => {
      if (editor && !editor.isDestroyed && value !== editor.getHTML()) {
        // editor.commands.setContent(value || "", false);
      }
    }, [editor?.view?.updateState, value]);

    return (
      <div
        ref={editorRef}
        className={cn("w-full flex flex-col gap-y-1", containerClassName)}
        onClick={() => {
          if (isFocused) {
            return;
          }
          editor?.commands.focus();
        }}
      >
        {label && <p className="text-xs text-foreground">{label}</p>}
        <div
          className={cn(
            "flex flex-col rounded-lg border border-border px-2 py-2 transition-all w-full",
            "focus-within:ring-2 focus-within:ring-ring/50 focus-within:border-ring",
            error &&
              "border-destructive focus-within:ring-destructive focus-within:border-destructive",
            className,
          )}
          onClick={() => setIsFocused(true)}
        >
          <>
            <EditorToolbar editor={editor} onAiClick={onAiClick} />
            <EditorContent
              editor={editor}
              className={cn("cursor-text", className)}
              onClick={() => editor?.commands.focus()}
            />
          </>
        </div>
      </div>
    );
  },
);

ResumeEditorField.displayName = "ResumeEditorField";

export default ResumeEditorField;
