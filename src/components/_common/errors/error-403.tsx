import { Button } from '@/components/ui/button';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
 
export default function Error403() {
    const router = useRouter();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">403 Forbidden</h2>
      <p>Bạn không có quyền truy cập vào trang này.</p>
      <Button
        onClick={() => router.back()}
        className=""
      >
        Go Back
      </Button>
    </div>
  );
}