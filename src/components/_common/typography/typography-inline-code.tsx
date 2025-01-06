import { cn } from "@/lib/utils";

interface TypographyInlinecodeProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export const TypographyInlinecode = ({ children, className }: TypographyInlinecodeProps) => {
    return (
      <code
        className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold", className)}
      >
        {children}
      </code>
    );
  };
  