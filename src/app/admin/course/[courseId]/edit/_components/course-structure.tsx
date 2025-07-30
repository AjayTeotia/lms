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
  DragEndEvent,
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
  GripVerticalIcon
} from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { reorderChapter, reorderLesson } from "../action";
import { DeleteChapterModal } from "./delete-chapter-modal";
import { DeleteLessonModal } from "./delete-leeson-modal";
import { NewChapterModal } from "./new-chapter-modal";
import { NewLessonModal } from "./new-lesson-modal";

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

  // console.log(items);

  useEffect(() => {
    setItems((prevItems) => {
      const updatedItems =
        data.data.chapter.map((chapter) => ({
          id: chapter.id,
          title: chapter.title,
          order: chapter.position,
          isOpen:
            prevItems.find((item) => item.id === chapter.id)?.isOpen || true,
          lessons: chapter.lesson.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            order: lesson.position,
          })),
        })) || [];

      return updatedItems;
    });
  }, [data]);

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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeId = active.id;
    const overId = over.id;
    const activeType = active.data.current?.type as "chapter" | "lesson";
    const overType = over.data.current?.type as "chapter" | "lesson";
    const courseId = data.data.id;

    if (activeType === "chapter") {
      let targetChapterId = null;

      if (overType === "chapter") {
        targetChapterId = overId;
      } else if (overType === "lesson") {
        targetChapterId = over.data.current?.chapterId ?? null;
      }

      if (!targetChapterId) {
        toast.error("Could not determine the chapter for reading");
        return;
      }

      const oldIndex = items.findIndex((item) => item.id === activeId);
      const newIndex = items.findIndex((item) => item.id === targetChapterId);

      if (oldIndex === -1 || newIndex === -1) {
        toast.error("Could not find the chapter old/new index for reading");
        return;
      }

      const reorderedChapter = arrayMove(items, oldIndex, newIndex);

      const updatedChapterForState = reorderedChapter.map((chapter, index) => ({
        ...chapter,
        order: index + 1,
      }));

      const previousItem = [...items];

      setItems(updatedChapterForState);

      if (courseId) {
        const chapterToUpdate = updatedChapterForState.map((chapter) => ({
          id: chapter.id,
          position: chapter.order,
        }));

        const reorderChapterPromise = () =>
          reorderChapter(courseId, chapterToUpdate);

        toast.promise(reorderChapterPromise(), {
          loading: "Updating chapter order...",
          success: (result) => {
            if (result.status === "success") return result.message;
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItem);
            return "Failed to reorder chapters. Please try again.";
          },
        });
      }

      return;
    }

    if (activeType === "lesson" && overType === "lesson") {
      const chapterId = active.data.current?.chapterId;
      const overChapterId = over.data.current?.chapterId;

      if (!chapterId || !overChapterId) {
        toast.error(
          "Lesson move between difference chapters or invalid chapter ID is not allowed."
        );
        return;
      }

      const chapterIndex = items.findIndex(
        (chapter) => chapter.id === chapterId
      );

      if (chapterIndex === -1) {
        toast.error("Could not find the chapter index for reading");
        return;
      }

      const chapterToUpdate = items[chapterIndex];

      const oldLessonIndex = chapterToUpdate.lessons.findIndex(
        (lesson) => lesson.id === activeId
      );

      const newLessonIndex = chapterToUpdate.lessons.findIndex(
        (lesson) => lesson.id === overId
      );

      if (oldLessonIndex === -1 || newLessonIndex === -1) {
        toast.error("Could not find the lesson old/new index for reading");
        return;
      }

      const reorderedLesson = arrayMove(
        chapterToUpdate.lessons,
        oldLessonIndex,
        newLessonIndex
      );

      const updatedLessonForState = reorderedLesson.map((lesson, index) => ({
        ...lesson,
        order: index + 1,
      }));

      const newItems = [...items];

      newItems[chapterIndex] = {
        ...chapterToUpdate,
        lessons: updatedLessonForState,
      };

      const previousItem = [...items];

      setItems(newItems);

      if (courseId) {
        const lessonToUpdate = updatedLessonForState.map((lesson) => ({
          id: lesson.id,
          position: lesson.order,
        }));

        const reorderLessonPromise = () =>
          reorderLesson(chapterId, lessonToUpdate, courseId);

        toast.promise(reorderLessonPromise(), {
          loading: "Reordering lessons...",
          success: (result) => {
            if (result.status === "success") return result.message;
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItem);
            return "Failed to reorder lessons. Please try again.";
          },
        });
      }

      return;
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

            <NewChapterModal courseId={data.data.id} />
          </CardHeader>

          <CardContent className="space-y-8">
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

                          <DeleteChapterModal
                            chapterId={item.id}
                            courseId={data.data.id}
                          />
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

                                      <DeleteLessonModal
                                        chapterId={item.id}
                                        courseId={data.data.id}
                                        lessonId={lesson.id}
                                      />
                                    </div>
                                  )}
                                </SortableItem>
                              ))}
                            </SortableContext>

                            <div className="p-2">
                              <NewLessonModal
                                courseId={data.data.id}
                                chapterId={item.id}
                              />
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
