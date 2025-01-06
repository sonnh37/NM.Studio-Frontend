interface SwiperRecentProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export const SwiperRecent = ({
    children,
    className,
  }: SwiperRecentProps) => {
    return (
      <blockquote
        className={`
             mt-6 block border-l-2 pl-6 italic ${className || ""}`}
      >
        {children}
      </blockquote>
    );
  };
  