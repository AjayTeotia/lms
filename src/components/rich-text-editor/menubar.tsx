import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { type Editor } from "@tiptap/react";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  RedoIcon,
  StrikethroughIcon,
  UndoIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface MenuBarProps {
  editor: Editor | null;
}

export function MenuBar({ editor }: MenuBarProps) {
  const [boldActive, setBoldActive] = useState<boolean>(false);
  const [italicActive, setItalicActive] = useState<boolean>(false);
  const [strikeActive, setStrikeActive] = useState<boolean>(false);
  const [headingActive, setHeadingActive] = useState<number | null>(null); // Active heading state
  const [bulletListActive, setBulletListActive] = useState<boolean>(false);
  const [orderedListActive, setOrderedListActive] = useState<boolean>(false);
  const [alignActive, setAlignActive] = useState<string | null>(null); // Active alignment state

  // Update states based on editor's active states
  useEffect(() => {
    if (editor) {
      setBoldActive(editor.isActive("bold"));
      setItalicActive(editor.isActive("italic"));
      setStrikeActive(editor.isActive("strike"));
      setBulletListActive(editor.isActive("bulletList"));
      setOrderedListActive(editor.isActive("orderList"));
    }
  }, [editor]);

  // Function to handle heading toggles
  const handleHeadingToggle = (level: 1 | 2 | 3) => {
    setHeadingActive(headingActive === level ? null : level); // Toggle heading state
    editor?.chain().focus().toggleHeading({ level }).run();
  };

  // Function to handle alignment toggles
  const handleAlignToggle = (alignment: string) => {
    setAlignActive(alignActive === alignment ? null : alignment); // Toggle alignment state
    editor?.chain().focus().setTextAlign(alignment).run();
  };

  return (
    <div className="border border-input border-t-0 border-x-0 rounded-t-lg p-2 bg-card flex flex-wrap items-center">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          {/* Bold Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={boldActive}
                onPressedChange={() => {
                  editor?.chain().focus().toggleBold().run();
                  setBoldActive(!boldActive);
                }}
                className={cn(boldActive && "bg-muted text-muted-foreground")}
              >
                <BoldIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          {/* Italic Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={italicActive}
                onPressedChange={() => {
                  editor?.chain().focus().toggleItalic().run();
                  setItalicActive(!italicActive);
                }}
                className={cn(italicActive && "bg-muted text-muted-foreground")}
              >
                <ItalicIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          {/* Strike Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={strikeActive}
                onPressedChange={() => {
                  editor?.chain().focus().toggleStrike().run();
                  setStrikeActive(!strikeActive);
                }}
                className={cn(strikeActive && "bg-muted text-muted-foreground")}
              >
                <StrikethroughIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Strike</TooltipContent>
          </Tooltip>

          {/* Heading 1 Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={headingActive === 1}
                onPressedChange={() => handleHeadingToggle(1)}
                className={cn(
                  headingActive === 1 && "bg-muted text-muted-foreground"
                )}
              >
                <Heading1Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>

          {/* Heading 2 Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={headingActive === 2}
                onPressedChange={() => handleHeadingToggle(2)}
                className={cn(
                  headingActive === 2 && "bg-muted text-muted-foreground"
                )}
              >
                <Heading2Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>

          {/* Heading 3 Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={headingActive === 3}
                onPressedChange={() => handleHeadingToggle(3)}
                className={cn(
                  headingActive === 3 && "bg-muted text-muted-foreground"
                )}
              >
                <Heading3Icon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Heading 3</TooltipContent>
          </Tooltip>

          {/* Bullet List Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={bulletListActive}
                onPressedChange={() => {
                  editor?.chain().focus().toggleBulletList().run();
                  setBulletListActive(!bulletListActive);
                }}
                className={cn(
                  bulletListActive && "bg-muted text-muted-foreground"
                )}
              >
                <ListIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          {/* Ordered List Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={orderedListActive}
                onPressedChange={() => {
                  editor?.chain().focus().toggleOrderedList().run();
                  setOrderedListActive(!orderedListActive);
                }}
                className={cn(
                  orderedListActive && "bg-muted text-muted-foreground"
                )}
              >
                <ListOrderedIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Ordered List</TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        <div className="flex flex-wrap gap-1">
          {/* Align Left Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={alignActive === "left"}
                onPressedChange={() => handleAlignToggle("left")}
                className={cn(
                  alignActive === "left" && "bg-muted text-muted-foreground"
                )}
              >
                <AlignLeftIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align Left</TooltipContent>
          </Tooltip>

          {/* Align Center Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={alignActive === "center"}
                onPressedChange={() => handleAlignToggle("center")}
                className={cn(
                  alignActive === "center" && "bg-muted text-muted-foreground"
                )}
              >
                <AlignCenterIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align Center</TooltipContent>
          </Tooltip>

          {/* Align Right Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={alignActive === "right"}
                onPressedChange={() => handleAlignToggle("right")}
                className={cn(
                  alignActive === "right" && "bg-muted text-muted-foreground"
                )}
              >
                <AlignRightIcon />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Align Right</TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        <div className="flex flex-wrap gap-1">
          {/* Undo Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => editor?.chain().focus().undo().run()}
                disabled={!editor?.can().undo()}
              >
                <UndoIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          {/* Redo Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => editor?.chain().focus().redo().run()}
                disabled={!editor?.can().redo()}
              >
                <RedoIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
