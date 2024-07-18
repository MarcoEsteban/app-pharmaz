
interface Props {
  children: React.ReactNode;
}

export const Card = ( { children }: Props ) => {
  return (
    <div className="relative flex flex-col w-full min-w-0 px-6 py-4 break-words bg-white border-0 border-transparent border-solid shadow-xl rounded-2xl bg-clip-border">
      { children }
    </div>
  );
};