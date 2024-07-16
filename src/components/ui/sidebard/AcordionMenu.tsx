'use client';

import clsx from 'clsx';
import React, { useState } from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  openMenu: boolean;
}

export const Accordion = ( { title, children, icon, openMenu }: Props ) => {

  // State
  const [ acordionOpen, setAcordionOpen ] = useState( false );

  return (
    <div className='max-w-md mb-2'>

      <div onClick={ () => setAcordionOpen( !acordionOpen ) } className='flex items-center bg-slate-200 px-2  rounded-lg justify-between text-gray-600 w-full overflow-hidden mt-32 md:mt-0 cursor-pointer font-semibold'>
        <div className={ clsx(
          'flex items-center gap-3 transition-all duration-300',
          { 'justify-center py-2': !openMenu, 'py-3': openMenu },
          { 'text-indigo-500': !acordionOpen,  }
        ) }>
          { icon }
          { title }
        </div>

        <div className={ clsx(
          "w-10 px-3 transform transition duration-300 ease-in-out",
          { 'rotate-90': acordionOpen, '-translate-y-0.0': !acordionOpen }
        ) }>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>

        </div>
      </div>

      <div className={ clsx(
        `overflow-hidden transition-max-height duration-300 ease-in-out pt-1`,
        { 'max-h-96 transition-all duration-300': !acordionOpen, 'max-h-0': acordionOpen },
        { 'pl-2': !openMenu, 'pl-0': openMenu }
      ) }>
        { children }
      </div>
    </div>
  );
};
