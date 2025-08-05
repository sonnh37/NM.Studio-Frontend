import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";
import { useEffect, useState } from "react";
import { CircleAlert, CircleCheck, CircleX, TriangleAlert } from "lucide-react";

export function Toaster() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const color = theme === "dark" ? "#000000" : "#ffffff";

  return (
    <SonnerToaster
      position="top-center"
      theme={
        theme === "light" || theme === "dark" || theme === "system"
          ? theme
          : "light"
      }
      className="flex justify-center"
      // duration={60000000}
      expand={true}
      toastOptions={{
        // closeButton: true,
        style: {
          margin: "0 auto", // Căn giữa theo chiều ngang
          width: "fit-content",
          minWidth: "100px",
          maxWidth: "90vw",
        },
        classNames: {
          toast: "flex justify-center",
        },
      }}
      icons={{
        success: <SuccessIcon color={color} />,
        error: <ErrorIcon color={color} />,
        warning: <WarningIcon color={color} />,
        info: <InformationIcon color={color} />,
      }}
    />
  );
}

interface IconProps {
  color?: string;
  size?: number;
}

const SuccessIcon = ({ color = "white", size = 22 }: IconProps) => (
  <CircleCheck
    size={size}
    fill="#1EDA45"
    color={color}
    strokeWidth={1}
  />
);

const ErrorIcon = ({ color = "white", size = 22 }: IconProps) => (
  <CircleX
    size={size}
    fill="#FF2F09" 
    color={color}
    strokeWidth={1}
  />
);

const InformationIcon = ({ color = "white", size = 22 }: IconProps) => (
  <CircleAlert
    size={size}
    fill="#48A8F6"
    color={color}
    strokeWidth={1}
  />
);

const WarningIcon = ({ color = "white", size = 22 }: IconProps) => (
  <TriangleAlert
    size={size}
    fill="#FCAF2A"
    color={color}
    strokeWidth={1}
  />
);
