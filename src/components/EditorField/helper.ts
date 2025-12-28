import { Bold, Highlighter, Italic, List, Underline } from "lucide-react";
import { Editor } from "@tiptap/core";

export const getFullToolbar = (editor: Editor | null) => [
  // {
  //   label: "Bold",
  //   icon: Bold,
  //   command: () => editor?.chain().focus().toggleBold().run(),
  //   active: "bold",
  // },
  // {
  //   label: "Italic",
  //   icon: Italic,
  //   command: () => editor?.chain().focus().toggleItalic().run(),
  //   active: "italic",
  // },
  // {
  //   label: "Underline",
  //   icon: Underline,
  //   command: () => editor?.chain().focus().toggleUnderline().run(),
  //   active: "underline",
  // },
  // {
  //   label: "Bullet list",
  //   icon: List,
  //   command: () => editor?.chain().focus().toggleBulletList().run(),
  //   active: "bulletList",
  // },
  // {
  //   label: "Highlight",
  //   icon: Highlighter,
  //   command: () => editor?.chain().focus().toggleHighlight().run(),
  //   active: "highlight",
  // },
];

export const getFakeToolbar = () => [
  {
    label: "Bold",
    icon: Bold,
  },
  {
    label: "Italic",
    icon: Italic,
  },
  {
    label: "Underline",
    icon: Underline,
  },
  {
    label: "Bullet list",
    icon: List,
  },
  {
    label: "Highlight",
    icon: Highlighter,
  },
];
