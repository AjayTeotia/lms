import { env } from "@/lib/env";

export function useConstructUrl(path: string): string {
  return `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${path}`;
}
