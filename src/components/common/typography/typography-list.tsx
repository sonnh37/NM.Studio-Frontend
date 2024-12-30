import { cn } from "@/lib/utils";

interface TypographyListProps {
  children: React.ReactNode;
  className?: string;
}

export const TypographyList = ({
  children,
  className,
}: TypographyListProps) => {
  return (
    <ul
        className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
    >
      {children}
    </ul>
  );
};
