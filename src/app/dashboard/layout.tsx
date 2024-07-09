import { Sidebard } from '@/components';


export default function DashboardLayout( { children }: { children: React.ReactNode; } ) {
  return (
    <main className="flex p-4 h-screen w-screen">
      <Sidebard />

      <div className="pl-8 pr-2 overflow-y-scroll flex-1">
        { children }
      </div>
    </main>
  );
}