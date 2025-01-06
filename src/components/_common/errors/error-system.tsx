import { Button } from '@/components/ui/button';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
 
export default function ErrorSystem({messgae = "Lỗi hệ thống"}: {messgae?: string}) {
    const router = useRouter();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">Network server</h2>
      <p>{messgae}</p>
      <Button
        onClick={() => router.back()}
        className=""
      >
        Go Back
      </Button>
    </div>
  );
}