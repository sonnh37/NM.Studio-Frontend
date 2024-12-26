import { Button } from "@/components/ui/button";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Error401() {
  const router = useRouter();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">401 Access</h2>
      <p>Bạn chưa đăng nhập.</p>
      <Button onClick={() => router.back()} className="">
        Go Back
      </Button>
    </div>
  );
}
