import { cn } from "@/lib/utils";

interface TypographyMutedProps {
  children: React.ReactNode;
  className?: string;
}

export const TypographyMuted = ({
  children,
  className,
}: TypographyMutedProps) => {
  return (
    <p
    className={cn("text-sm text-muted-foreground", className)}
    >
      {children}
    </p>
  );
};
