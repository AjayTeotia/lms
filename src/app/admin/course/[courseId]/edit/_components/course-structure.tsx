"use client";

import { AdminCourseType } from "@/app/data/admin/admin-get-course";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DraggableSyntheticListeners,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileTextIcon,
  GripVerticalIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface CourseStructureProps {
  data: AdminCourseType;
}

interface SortableItemProps {
  id: string;
  children: (listeners: DraggableSyntheticListeners) => ReactNode;
  className?: string;
  data?: {
    type: "chapter" | "lesson";
    chapterId?: string;
  };
}

export function CourseStructure(data: CourseStructureProps) {
  const initialItems =
    data.data.chapter.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      order: chapter.position,
      isOpen: true,
      lessons: chapter.lesson.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        order: lesson.position,
      })),
    })) || [];

  const [items, setItems] = useState(initialItems);

  function SortableItem({ children, id, className, data }: SortableItemProps) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: id, data: data });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn("touch-none", className, isDragging ? "z-50" : "")}
      >
        {children(listeners)}
      </div>
    );
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function toggleChapter(chapterId: string) {
    setItems(
      items.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isOpen: !chapter.isOpen }
          : chapter
      )
    );
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div>
      <DndContext
        collisionDetection={rectIntersection}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-border">
            <CardTitle>Chapters</CardTitle>
          </CardHeader>

          <CardContent>
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={items}
            >
              {items.map((item) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  data={{
                    type: "chapter",
                  }}
                >
                  {(listeners) => (
                    <Card>
                      <Collapsible
                        open={item.isOpen}
                        onOpenChange={() => toggleChapter(item.id)}
                      >
                        <div className="flex items-center justify-between p-3 border-b border-border">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" {...listeners}>
                              <GripVerticalIcon className="size-4" />
                            </Button>

                            <CollapsibleTrigger asChild>
                              <Button
                                className="flex items-center"
                                variant="ghost"
                                size="icon"
                              >
                                {item.isOpen ? (
                                  <ChevronDownIcon className="size-4" />
                                ) : (
                                  <ChevronRightIcon className="size-4" />
                                )}
                              </Button>
                            </CollapsibleTrigger>

                            <p className="cursor-pointer hover:text-primary pl-2">
                              {item.title}
                            </p>
                          </div>

                          <Button variant="destructive" size="icon">
                            <Trash2Icon className="size-4" />
                          </Button>
                        </div>

                        <CollapsibleContent>
                          <div>
                            <SortableContext
                              items={item.lessons.map((lesson) => lesson.id)}
                              strategy={verticalListSortingStrategy}
                            >
                              {item.lessons.map((lesson) => (
                                <SortableItem
                                  key={lesson.id}
                                  id={lesson.id}
                                  data={{ type: "lesson", chapterId: item.id }}
                                >
                                  {(lessonListeners) => (
                                    <div className="flex items-center justify-between p-2 hover:bg-accent rounded-sm">
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          {...lessonListeners}
                                        >
                                          <GripVerticalIcon className="size-4" />
                                        </Button>

                                        <FileTextIcon className="size-4" />

                                        <Link
                                          href={`/admin/course/${data.data.id}/${item.id}/${lesson.id}/edit`}
                                        >
                                          {lesson.title}
                                        </Link>
                                      </div>

                                      <Button variant="destructive" size="icon">
                                        <Trash2Icon className="size-4" />
                                      </Button>
                                    </div>
                                  )}
                                </SortableItem>
                              ))}
                            </SortableContext>

                            <div className="p-2">
                              <Button className="w-full" variant="outline">Create New Lesson</Button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  )}
                </SortableItem>
              ))}
            </SortableContext>
          </CardContent>
        </Card>
      </DndContext>
    </div>
  );
}
