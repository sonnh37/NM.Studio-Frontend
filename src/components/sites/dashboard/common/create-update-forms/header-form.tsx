import { ButtonLoading } from "@/components/_common/buttons/button-loading";
import { TypographyH3 } from "@/components/_common/typography/typography-h3";
import { TypographyP } from "@/components/_common/typography/typography-p";
import { Button } from "@/components/ui/button";
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
      <div className="flex flex-row items-center gap-4">
        <Link href={previousPath}>
          <Button type="button" variant="outline">
            <IoReturnUpBackOutline />
          </Button>
        </Link>
        <TypographyH3 className="tracking-normal font-thin">
          {title}
        </TypographyH3>
        <TypographyP className="[&:not(:first-child)]:mt-0">
          {initialData ? `Last Updated: ${initialData.lastUpdatedDate}` : null}
        </TypographyP>
      </div>
      <div className="flex justify-end">
        <ButtonLoading
          className="flex justify-center items-center"
          size="lg"
          type="submit"
          disabled={loading}
        >
          {action}
        </ButtonLoading>
      </div>
    </div>
  );
};
