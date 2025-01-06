interface SwiperHomeProps {
  children: React.ReactNode;
  className?: string;
}

export const SwiperHome = ({
  children,
  className,
}: SwiperHomeProps) => {
  return (
    <blockquote
      className={`
           mt-6 block border-l-2 pl-6 italic ${className || ""}`}
    >
      {children}
    </blockquote>
  );
};
