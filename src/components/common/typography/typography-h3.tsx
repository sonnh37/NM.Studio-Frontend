import { cn } from "@/lib/utils";

interface TypographyH3Props {
    children: React.ReactNode;
    className?: string;
  }
  
  export const TypographyH3 = ({ children, className }: TypographyH3Props) => {
    return (
      <h3
        className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}
      >
        {children}
      </h3>
    );
  };
  