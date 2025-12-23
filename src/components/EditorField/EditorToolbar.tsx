import {
  getFakeToolbar,
  getFullToolbar,
} from "@/components/EditorField/helper";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/core";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { Tooltip } from "@/components/ui/tooltip";

interface EditorToolbarProps {
  editor: Editor | null;
  onAiClick?: (data: unknown | undefined) => void;
}

const EditorToolbar = ({ editor, onAiClick }: EditorToolbarProps) => {
  if (editor) {
    return (
      <div className="mb-2.5 flex justify-between">
        <div className="flex gap-x-1">
          {/*{getFullToolbar(editor).map(*/}
          {/*  ({ label, icon: Icon, command, active }) => (*/}
          {/*    <Tooltip key={label} label={label}>*/}
          {/*      <Toggle*/}
          {/*        className="h-6 w-6 p-0 text-muted-foreground"*/}
          {/*        pressed={editor?.isActive(active)}*/}
          {/*        onClick={command}*/}
          {/*        aria-label={label}*/}
          {/*      >*/}
          {/*        <Icon*/}
          {/*          className={cn(*/}
          {/*            "h-4 w-4",*/}
          {/*            editor?.isActive(active) && "text-black",*/}
          {/*          )}*/}
          {/*        />*/}
          {/*      </Toggle>*/}
          {/*    </Tooltip>*/}
          {/*  ),*/}
          {/*)}*/}
          {/*{onAiClick && (*/}
          {/*  <Tooltip label="AI">*/}
          {/*    <Toggle*/}
          {/*      className="h-6 w-6 p-0 text-muted-foreground"*/}
          {/*      onClick={() => onAiClick({ value: editor?.getText() || "" })}*/}
          {/*      aria-label="Ai"*/}
          {/*    >*/}
          {/*      <Brain className="h-4 w-4 text-secondary-purple" />*/}
          {/*    </Toggle>*/}
          {/*  </Tooltip>*/}
          {/*)}*/}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-2.5 flex justify-between">
      {/*<div className="flex gap-x-1">*/}
      {/*  {getFakeToolbar().map(({ label, icon: Icon }) => (*/}
      {/*    <Tooltip key={label} label={label}>*/}
      {/*      <Toggle*/}
      {/*        className="h-6 w-6 p-0 text-muted-foreground"*/}
      {/*        aria-label={label}*/}
      {/*      >*/}
      {/*        <Icon className={cn("h-4 w-4")} />*/}
      {/*      </Toggle>*/}
      {/*    </Tooltip>*/}
      {/*  ))}*/}
      {/*  {onAiClick && (*/}
      {/*    <Tooltip label="AI">*/}
      {/*      <Toggle*/}
      {/*        className="h-6 w-6 p-0 text-muted-foreground"*/}
      {/*        aria-label="Ai"*/}
      {/*      >*/}
      {/*        <Brain className="h-4 w-4 text-secondary-purple" />*/}
      {/*      </Toggle>*/}
      {/*    </Tooltip>*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
};

export default EditorToolbar;
