interface Props {
  title: string;
  className?: string;
}

export const Title = ({ title, className }: Props) => {
  return (
    <div className={`text-3xl font-extrabold py-2 ${className}`}>
      <span className="bg-clip-text text-transparent gradient">
        {title}
      </span>
    </div>
  );
};

