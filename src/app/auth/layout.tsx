
export default function AuthLayout( { children }: { children: React.ReactNode; } ) {
  return (
    <main>
      <h1>Hello Root Layout Auth</h1>

      <div className="p-2">
        { children }
      </div>
    </main>
  );
}