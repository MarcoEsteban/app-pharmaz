
interface Props {
  title: string;
}

export const Title = ( { title }: Props ) => {
  return (
    <div className="text-3xl font-extrabold py-2">
      <span className="bg-clip-text text-transparent gradient">
        { title }
      </span>
    </div>
  );
};