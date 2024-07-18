import { Header, Sidebard } from '@/components';


export default function DashboardLayout( { children }: { children: React.ReactNode; } ) {
  return (
    <div className="min-h-screen grid grid-cols-custom p-3">

      <Sidebard />

      <main className="">
        <Header />
        <div className="h-[87vh] overflow-y-scroll pl-4 pt-4">
          { children }
        </div>
      </main>

    </div>
  );
}
