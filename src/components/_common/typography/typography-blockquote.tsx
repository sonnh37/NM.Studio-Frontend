import { cn } from "@/lib/utils";

interface TypographyBlockquoteProps {
  children: React.ReactNode;
  className?: string;
}

export const TypographyBlockquote = ({
  children,
  className,
}: TypographyBlockquoteProps) => {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
    >
      {children}
    </blockquote>
  );
};
