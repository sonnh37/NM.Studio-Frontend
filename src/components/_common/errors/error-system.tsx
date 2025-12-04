import { Button } from "@/components/ui/button";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function ErrorSystem({
  message = "Lỗi hệ thống",
}: {
  message?: string;
}) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">Network server</h2>
      <p>{message}</p>
      <Button onClick={() => window.location.reload()} className="">
        Reload
      </Button>
    </div>
  );
}
