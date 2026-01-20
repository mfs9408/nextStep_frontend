import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";

interface commonEditorConfigProps {
  placeholder?: string;
}

export const commonEditorConfig = (props: commonEditorConfigProps) => {

  return {
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      Placeholder.configure({
        placeholder: props.placeholder,
        showOnlyWhenEditable: false,
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-0 before:left-0 before:opacity-50 before-pointer-events-none text-muted-foreground",
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn("outline-none"),
        style:
          "font-size:14px; color: #000000; max-height: 400px; padding-left: 0px; padding-right: 0px; overflow: auto",
      },
    },
    placeholder: props.placeholder,
  };
};
