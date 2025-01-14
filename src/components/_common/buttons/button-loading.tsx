import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonLoadingProps {
  className?: string;
  [key: string]: any;
  children: React.ReactNode;
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <Button
      className={cn("uppercase flex items-center gap-2", className)}
      {...props}
    >
      {props["disabled"] ? (
        <>
          <Loader2 className="animate-spin mr-2" /> Loading
        </>
      ) : (
        children
      )}
    </Button>
  );
};
