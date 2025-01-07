import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonLoadingProps {
  className?: string;
  [key: string]: any; // Cho phép các props khác
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({
  className,
  ...props
}) => {
  return (
    <Button
      disabled
      className={cn("uppercase flex items-center gap-2", className)}
      {...props}
    >
      <Loader2 className="animate-spin" />
      Loading
    </Button>
  );
};
