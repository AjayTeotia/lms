import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="w-full min-h-screen flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <div className="flex items-center justify-center w-full">
          <XIcon className="size-12 p-2 bg-red-500/30 text-red-500 rounded-full" />
        </div>
      </Card>
    </div>
  );
}
