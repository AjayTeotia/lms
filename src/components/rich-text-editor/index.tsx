"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./menubar";
import TextAlign from "@tiptap/extension-text-align";

interface RichTextField {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ field }: { field: RichTextField }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 focus:outline-none w-full prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-full",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : "<p>Hello World! 🌎️</p>",

    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
      <MenuBar editor={editor} />

      <EditorContent editor={editor} />
    </div>
  );
}
