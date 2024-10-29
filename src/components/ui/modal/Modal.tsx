'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoClose } from 'react-icons/io5';

interface Props {
  titleModal: string;
  sizeModal?: string; // max-w-md | max-w-lg | max-w-xl | max-w-4xl | max-w-7xl
  children: React.ReactNode;
}

export const Modal = ( { titleModal, sizeModal = 'max-w-md', children }: Props ) => {

  const pathname = usePathname();

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto font-sans h-full w-full flex justify-center items-center">
      <div className={ `relative p-4 w-full max-h-full ${ sizeModal }` }>

        {/*============================= Modal Content =============================*/ }
        <div className="relative bg-white rounded-xl border border-solid shadow-lg">

          {/*========== Modal Header ==========*/ }
          <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t">

            {/* Titulo Modal */ }
            <h5 className="block font-sans text-lg font-semibold leading-snug text-gray-700 capitalize">
              { titleModal }
            </h5>

            {/* Cerrar Modal */ }
            <Link
              href={ pathname }
              className="text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <IoClose size={ 20 } />
            </Link>

          </div>

          {/*=========== Modal Body ===========*/ }
          <div className="p-3 md:p-4">
            { children }
          </div>

        </div>
      </div>
    </div>
  );
};
