import { ButtonLoading } from "@/components/_common/buttons/button-loading";
import { TypographyH3 } from "@/components/_common/typography/typography-h3";
import { TypographyP } from "@/components/_common/typography/typography-p";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { IoReturnUpBackOutline } from "react-icons/io5";

interface HeaderFormProps {
  previousPath: string;
  title: string;
  initialData?: any | null;
  loading: boolean;
  action: string;
}

export const HeaderForm: React.FC<HeaderFormProps> = ({
  previousPath,
  title,
  initialData,
  loading,
  action,
}) => {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <div className="flex flex-row items-center">
        <Link href={previousPath}>
          <Button
            type="button"
            className="-ml-4 gap-1"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft />
            Back
          </Button>
        </Link>
        {/* <TypographyH3 className="tracking-normal font-thin">
          {title}
        </TypographyH3> */}
        {/* <TypographyP className="[&:not(:first-child)]:mt-0">
          {initialData ? `Last Updated: ${initialData.lastUpdatedDate}` : null}
        </TypographyP> */}
      </div>
      <div className="flex justify-end">
        <Button
          className={cn(
            "flex items-center gap-2",
            "flex justify-center items-center"
          )}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Loading
            </>
          ) : (
            <>{action}</>
          )}
        </Button>
      </div>
    </div>
  );
};
