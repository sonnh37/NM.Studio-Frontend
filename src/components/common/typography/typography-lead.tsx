import { cn } from "@/lib/utils";

interface TypographyLeadProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export const TypographyLead = ({ children, className }: TypographyLeadProps) => {
    return (
      <p
      className={cn("text-xl inline-block text-muted-foreground", className)}
      >
        {children}
      </p>
    );
  };
  