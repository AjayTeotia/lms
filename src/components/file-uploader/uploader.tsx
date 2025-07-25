"use client";

import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { RenderEmptyState } from "./render-states";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

export function Uploader() {
  const [fileState, setFileState] = useState<UploaderState>({
    id: null,
    file: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    error: false,
    fileType: "image",
  });

  function uploadFile(file: File) {
    setFileState((prev) => ({ ...prev, uploading: true, progress: 0 }));

    try {
    } catch (error) {}
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      setFileState({
        file: file,
        uploading: true,
        progress: 0,
        objectUrl: URL.createObjectURL(file),
        error: false,
        id: uuidv4(),
        isDeleting: false,
        fileType: "image",
      });
    }
  }, []);

  function rejectFiles(fileRejections: FileRejection[]) {
    fileRejections.forEach((fileRejection) => {
      if (fileRejection.errors.length) {
        const tooManyFiles = fileRejection.errors.find(
          (error) => error.code === "too-many-files"
        );

        if (tooManyFiles) {
          toast.error("Too many file selected. Please select only one file.");
        }

        const fileSize = fileRejection.errors.find(
          (error) => error.code === "file-too-large"
        );

        if (fileSize) {
          toast.error("File size is too large. Please select a smaller file.");
        }
      }
    });
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 1024 * 1024 * 5, // 5mb
    onDropRejected: rejectFiles,
  });

  return (
    <Card
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
      {...getRootProps()}
    >
      <CardContent className="flex items-center justify-center h-full w-full p-4">
        <input {...getInputProps()} />

        <RenderEmptyState isDragActive={isDragActive} />
        {/* <ErrorState /> */}
      </CardContent>
    </Card>
  );
}
