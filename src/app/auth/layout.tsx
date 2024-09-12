
export default function AuthLayout( { children }: { children: React.ReactNode; } ) {
  return (
    <main className="w-screen h-screen bg-cover bg-center bg-[url('/images/fondo.png')]">
      <div className="w-screen h-screen flex justify-center items-center font-sans tracking-wide">
        { children }
      </div>
    </main>
  );
}
