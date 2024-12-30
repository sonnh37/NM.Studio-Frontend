import { cn } from "@/lib/utils";

interface TypographyH1Props {
  children: React.ReactNode;
  className?: string;
}

export const TypographyH1 = ({ children, className }: TypographyH1Props) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
};
