'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import clsx from 'clsx';
import Swal from 'sweetalert2';
import { zodResolver } from '@hookform/resolvers/zod';

import { Menus, RolMe } from '@/interfaces';
import { rolesSchema } from '@/validations';
import { createUpdateRoles } from '@/actions';
import { BtnCancelar, BtnGuardar } from '@/components';

import {
  FaBuildingUser,
  FaCashRegister,
  FaCircleUser,
  FaCubes,
  FaFilePdf,
  FaMoneyCheckDollar,
  FaPills,
  FaTags,
  FaTruckMedical,
  FaUserGroup,
  FaUserSecret,
  FaUserTie,
} from 'react-icons/fa6';
import { IconType } from 'react-icons';

const iconMenusMapping: {[ key: string ]: IconType} = {
  // Usuario
  FaUserGroup: FaUserGroup,
  FaUserSecret: FaUserSecret, 
  FaBuildingUser: FaBuildingUser,
  // Almacen
  FaPills: FaPills,
  FaTags: FaTags,
  FaCubes: FaCubes,
  // Compras
  FaTruckMedical: FaTruckMedical,
  // Ventas
  FaUserTie: FaUserTie,
  FaCashRegister: FaCashRegister,
  FaMoneyCheckDollar: FaMoneyCheckDollar,
  // Reportes
  FaCircleUser: FaCircleUser,
  FaFilePdf: FaFilePdf,
};

type FormInputs = {
  nombre: string;
  menus: string[];
};

interface Props {
  roles: Partial<RolMe>;
  menus: Menus[];
}

export const FormRoles = ( { roles, menus }: Props ) => {
  
  const router = useRouter();       // Para navegar a una nueva ruta.
  const pathname = usePathname();   // Para obtener la ruta actual.
  console.log({roles})

  // ================
  // React Hook Form:
  // ================
  const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<FormInputs>( {
    resolver: zodResolver( rolesSchema ), // Aplicando el Validador de Zod.

    defaultValues: {
      nombre: roles.nombre || '',
      menus: roles.menus ? roles.menus.map( menu => menu.id) : [],
    }
  } );

  watch( 'menus' ); // Permite redibujar o pintar los menus en caso que exista un cambio.

  // ===================================
  // Manejo de los valores de los Menus:
  // ===================================
  const onMenusChange = ( id: string ) => {
    // Set :: Es un arreglo que NO acepta duplicados.
    const menus = new Set( getValues( 'menus' ) );
    menus.has( id ) ? menus.delete( id ) : menus.add( id );

    setValue( 'menus', Array.from( menus ) );
  };

  // =====================
  // Envio del Formulario:
  // =====================
  const onSubmit = async ( data: FormInputs ) => {

    const formData = new FormData;
    const { ...rolToSave } = data;

    if ( roles.id ) {
      formData.append( 'id', roles.id ?? '' );
    }
    formData.append( 'nombre', rolToSave.nombre );
    formData.append( 'menus', rolToSave.menus.toString() );

    const { ok, message } = await createUpdateRoles( formData );

    // Muestra el Mensaje de Alerta Cuando Todo Sale Bien:
    if ( ok ) {
      Swal.fire( {
        position: "center",
        icon: "success",
        title: `${message}`,
        showConfirmButton: false,
        timer: 1500
      } );
    }

    // Muestra el Mensaje de Alerta Cuando Algo Sale Mal:
    if (!ok) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${message}`,
        showConfirmButton: false,
        timer: 1500
      });
    }

    router.replace( pathname );
  };

  return (
    <form onSubmit={ handleSubmit( onSubmit ) } >
      <div className="grid gap-4 mb-4 grid-cols-2">
        <div className="col-span-2">
          <label htmlFor="nombre" className="label-text">Nombre</label>
          <input
            className={ clsx( "input-text", errors.nombre && 'focus:border-red-500 border-red-500' ) }
            type="text"
            id="nombre"
            autoFocus
            { ...register( 'nombre' ) }
            placeholder="Ingrese un nombre"
          />
          { errors.nombre && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.nombre.message }</p> }
        </div>

        <div className="col-span-2">
          <label htmlFor="menus" className="label-text">Seleccionar Menus</label>
          <div className={ "w-full my-2 grid grid-cols-1 md:grid-cols-2 gap-2" }>
            {
              menus.map( menu => {
                const IconCompenent = iconMenusMapping[menu.icon]
                const newMenu = {
                  ...menu,
                  enlace: menu.enlace,
                  icon: <IconCompenent size={22} />
                }
                return (
                  <div 
                    key={ menu.id }
                    onClick={ () => onMenusChange( menu.id ) }
                    className={
                      clsx(
                        "border flex rounded-md p-2 gap-2 transition-all cursor-pointer items-center text-gray-600",
                        { 'gradient text-white': getValues( 'menus' ).includes( menu.id ) }
                      )
                    }
                  >
                    { newMenu.icon }
                    { menu.nombre }
                  </div>
                )
              })
            }
          </div>
          { errors.menus && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{ errors.menus.message }</p> }
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-2">
        <BtnGuardar />
        <BtnCancelar />
      </div>
    </form>
  );
};
