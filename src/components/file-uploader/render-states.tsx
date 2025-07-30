// render-state

import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, LoaderIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mx-auto size-12 rounded-full bg-muted">
        <CloudUploadIcon
          className={cn(
            "size-6 text-muted-foreground",
            isDragActive && "text-primary"
          )}
        />
      </div>

      <p className="text-base font-semibold text-foreground">
        Drop your files here or{" "}
        <span className="font-bold text-primary cursor-pointer">
          click to upload
        </span>
      </p>

      <Button className="mt-4" type="button">
        Select File
      </Button>
    </div>
  );
}

export function ErrorState() {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mx-auto size-12 rounded-full bg-destructive/30 mb-4">
        <ImageIcon className="size-6 text-destructive" />
      </div>

      <p className="text-base font-semibold">Upload Failed</p>

      <p className="text-xs text-muted-foreground mt-1">Something went wrong</p>

      <Button className="mt-4" type="button">
        Try Again
      </Button>
    </div>
  );
}

export function RenderUploadedSate({
  previewUrl,
  isDeleting,
  handleRemoveFile,
  fileType,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
  fileType: "image" | "video";
}) {
  return (
    <div className="relative group w-full h-full flex items-center justify-center">
      {fileType === "video" ? (
        <video src={previewUrl} controls className="w-full h-full rounded-md" />
      ) : (
        <Image
          src={previewUrl}
          alt="Preview"
          fill
          className="object-cover p-2"
        />
      )}

      <Button
        variant="destructive"
        size="icon"
        className={cn("absolute top-4 right-4")}
        onClick={handleRemoveFile}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <LoaderIcon className="size-4 animate-spin" />
        ) : (
          <XIcon className="size-4" />
        )}
      </Button>
    </div>
  );
}

export function RenderUploadingState({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className="text-center flex justify-center items-center flex-col">
      <p>{progress}%</p>
      <p className="mt-2 text-sm font-medium text-foreground">Uploading...</p>

      <p className="mt-1 text-xs text-muted-foreground truncate max-w-xs">
        {file.name}
      </p>
    </div>
  );
}
