import { cn } from "@/lib/utils";

interface TypographySmallProps {
  children: React.ReactNode;
  className?: string;
}

export const TypographySmall = ({
  children,
  className,
}: TypographySmallProps) => {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
};
