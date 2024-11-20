import Image from "next/image";
import { FormLogin } from "./ui/FormLogin";

export default function LoginPage() {
  return (
    <div className="justify-center items-center w-full shadow rounded-lg bg-white px-6 flex flex-col md:w-1/2 lg:w-1/5">
      {/*======================== Logo ============================*/}
      <div className="flex items-center gap-2 py-4 pb-6">
        {/* <Image */}
        {/*   src="/images/ICON-PHARMAZ.png" */}
        {/*   className="w-14 h-14" */}
        {/*   alt="Logo" */}
        {/*   width={60} */}
        {/*   height={60} */}
        {/* unoptimized={true} */}
        {/* /> */}
        <div className="md:text-4xl lg:text-5xl font-sans font-semibold">
          <span className="bg-clip-text text-transparent gradient">
            LINDAURA
          </span>
        </div>
      </div>

      <FormLogin />
    </div>
  );
}
