import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon } from "lucide-react";
import { Button } from "../ui/button";

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
