
interface Props {
  title: string;
}

export const Title = ( { title }: Props ) => {
  return (
    <div className="text-2xl font-extrabold p-2 m-4">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-sky-500 to-indigo-800">
        { title }
      </span>
    </div>
  );
};