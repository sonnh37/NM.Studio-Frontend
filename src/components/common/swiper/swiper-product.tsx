interface SwiperProductProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export const SwiperProduct = ({
    children,
    className,
  }: SwiperProductProps) => {
    return (
      <blockquote
        className={`
             mt-6 block border-l-2 pl-6 italic ${className || ""}`}
      >
        {children}
      </blockquote>
    );
  };
  