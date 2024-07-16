import Image from 'next/image';
import { FaCamera, FaCheck, FaExpeditedssl, FaEye, FaTimes } from 'react-icons/fa';
import { FaPenToSquare, FaPrescriptionBottleMedical, FaTrashCan, FaUnlockKeyhole } from 'react-icons/fa6';

export default function UsuariosTable() {
  return (
    <div className="flex-auto p-1 my-2 border border-solid rounded-lg">

      <div className="p-0 overflow-x-auto">
        <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">

          {/*======================================= Cabecera =======================================*/ }
          <thead className="align-bottom">
            <tr>
              <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Author</th>
              <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none  text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Function</th>
              <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Status</th>
              <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Employed</th>
              <th className="px-6 py-3 font-semibold capitalize  bg-transparent border-b border-gray-200 border-solid shadow-none  text-xs tracking-none whitespace-nowrap text-slate-400 opacity-70">ACTIONS</th>
            </tr>
          </thead>

          {/*======================================== Cuerpo ========================================*/ }
          <tbody>

            <tr className="border-b">

              <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                <div className="flex px-2 py-1">
                  <div>
                    <Image
                      className="object-cover inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-in-out text-sm h-9 w-9 rounded-xl"
                      src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                      alt=""
                      width={ 8 }
                      height={ 8 }
                    />
                    {/* <FaUserCircle
                      className="inline-flex items-center justify-center mr-4 transition-all duration-200 ease-in-out text-sm h-9 w-9 rounded-xl"
                      size={ 28 } /> */}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h6 className="mb-0 leading-normal font-medium text-sm">Laurent Perrier</h6>
                    <p className="mb-0 leading-tight text-xs text-slate-400">laurent@creative-tim.com</p>
                  </div>
                </div>
              </td>

              <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                <p className="mb-0 font-semibold leading-tight text-xs">Executive</p>
                <p className="mb-0 leading-tight text-xs text-slate-400">Projects</p>
              </td>

              <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                {/* <span className="bg-gradient-to-tl from-red-500 to-red-400 px-3 text-[9px] rounded-lg py-1 inline-flex gap-1 whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white"> */ }
                <span className="bg-gradient-to-br from-red-400 via-red-500 to-red-600 px-3 text-[9px] rounded-lg py-1 inline-flex gap-1 whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">
                  <FaTimes />
                  Inactivo
                </span>
              </td>

              <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                <span className="font-semibold leading-tight text-xs text-slate-400">19/09/17</span>
              </td>
              <td className="text-center">

                <button type="button" className="btn-gnrl gradient-delete">
                  <FaTrashCan size={ 18 } />
                </button>

                <button type="button" className="btn-gnrl gradient-enable">
                  <FaPrescriptionBottleMedical size={ 18 } />
                </button>

                <button type="button" className="btn-gnrl gradient-update">
                  <FaPenToSquare size={ 18 } />
                </button>

                <button type="button" className="btn-gnrl gradient-show">
                  <FaEye size={ 18 } />
                </button>

                <button type="button" className="btn-gnrl gradient-photo">
                  <FaCamera size={ 18 } />
                </button>

                <button type="button" className="btn-gnrl gradient">
                  <FaUnlockKeyhole size={ 18 } />
                </button>
              </td>
            </tr>

            <tr>
              <td className="p-2 align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
                <div className="flex px-2 py-1">
                  <div>
                    <Image
                      className="object-cover inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-in-out text-sm h-9 w-9 rounded-xl"
                      src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                      alt=""
                      width={ 8 }
                      height={ 8 }
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h6 className="mb-0 leading-normal text-sm">Miriam Eric</h6>
                    <p className="mb-0 leading-tight text-xs text-slate-400">miriam@creative-tim.com</p>
                  </div>
                </div>
              </td>
              <td className="p-2 align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
                <p className="mb-0 font-semibold leading-tight text-xs">Programtor</p>
                <p className="mb-0 leading-tight text-xs text-slate-400">Developer</p>
              </td>
              <td className="p-2 leading-normal text-center align-middle bg-transparent border-b-0 text-sm whitespace-nowrap shadow-transparent">
                <span className="bg-gradient-to-tl from-green-500 to-green-400 px-3 text-[9px] rounded-lg py-1 inline-flex gap-1 whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">
                  <FaCheck />
                  Activo
                </span>
              </td>
              <td className="p-2 text-center align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
                <span className="font-semibold leading-tight text-xs text-slate-400">14/09/20</span>
              </td>
              <td className="p-2 align-middle bg-transparent border-b-0 whitespace-nowrap shadow-transparent">
                <a href="javascript:;" className="font-semibold leading-tight text-xs text-slate-400"> Edit </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}