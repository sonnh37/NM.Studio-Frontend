import { cn } from "@/lib/utils";

interface TypographyLargeProps {
  children: React.ReactNode;
  className?: string;
}

export const TypographyLarge = ({
  children,
  className,
}: TypographyLargeProps) => {
  return (
    <div className={cn("text-lg font-semibold", className)}>
      {children}
    </div>
  );
};
