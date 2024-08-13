// 'use client';

// import clsx from 'clsx';
// import { usePathname, useRouter } from 'next/navigation';

// import { useEffect, useState } from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import Swal from 'sweetalert2';

// // import { createRol, getById, getRolesMenusById, updateRol } from '@/actions';
// import { BtnCancelar, BtnGuardar } from '@/components';

// type FormInputs = {
//   id?: string;
//   nombre: string;
//   menus: string[];
// };

// type Menus = {
//   id: string;
//   nombre: string;
// };

// interface Props {
//   id?: string;
// }

// const menu: Menus[] = [
//   {
//     id: '1',
//     nombre: 'Gestión Perfil'
//   },
//   {
//     id: '2',
//     nombre: 'Gestión Roles'
//   },
//   {
//     id: '3',
//     nombre: 'Gestión Usuarios'
//   }
// ];

// export const FormRoles = ( { id }: Props ) => {

//   const router = useRouter();     // Para navegar a una nueva ruta.
//   const pathname = usePathname(); // Para obtener la ruta actual.

//   const [ menus, setMenus ] = useState<Menus[]>( menu );          // Almacena todos los menus perteneciente al ID del Rol.
//   const [ isEditar, setIsEditar ] = useState<boolean>( false ); // Permite saber en que formulario esta en ADD o UPDATE.

//   //=================== Usando React Hook Form ===================
//   const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormInputs>( {
//     // defaultValues: {
//     //   menus: [] // Inicializar 'menus' como un array vacío.
//     // }
//   } );

//   useEffect( () => {
//     // Server Actions - Obtenr los Menus por el ID
//     // const fetchMenus = async () => {
//     // const data = await getById();
//     // setMenus( data.menus );
//     // };

//     // Server Action - Obtener los Menus de los Roles de Acuerdo al ID
//     const loadRolToEditar = async ( id: string ) => {
//       // const res = await getRolesMenusById( id );

//       // if ( res.ok ) {
//       //   setValue( 'nombre', res.data?.nombre as string );
//       //   setValue( 'menus', res.data?.menus.map( menu => menu.id ) as [] );
//       setIsEditar( true );
//       // }
//     };

//     // fetchMenus();

//     if ( id ) {
//       loadRolToEditar( id );
//     }
//   }, [ id, setValue ] );


//   const onSubmit: SubmitHandler<FormInputs> = async ( data ) => {

//     const { nombre, menus } = data;

//     console.log( { nombre, menus } );

//     // var res;
//     // if ( !isEditar ) {
//       // res = await createRol( { nombre, menus } );
//     // }

//     // if ( isEditar ) {
//       // res = await updateRol( { id, nombre, menus } );
//     // }

//     // if ( res === undefined ) return 'Error';

//     // Muestra el Mensaje de Alerta Cuando Todo Sale Bien:
//     // if ( res.ok ) {
//     if ( true ) {
//       Swal.fire( {
//         position: "center",
//         icon: "success",
//         // title: `${ res.message }`,
//         title: `Guardado Exitosamente`,
//         showConfirmButton: false,
//         timer: 1500
//       } );
//     }

//     // Muestra el Mensaje de Alerta Cuando Algo Sale Mal:
//     // if ( !res.ok ) {
//     //   Swal.fire( {
//     //     position: "center",
//     //     icon: "error",
//     //     title: `${ res.message }`,
//     //     showConfirmButton: false,
//     //     timer: 1500
//     //   } );
//     // }

//     router.replace( pathname );
//   };

//   return (

//     <form onSubmit={ handleSubmit( onSubmit ) }>
//       <div className="grid gap-4 mb-4 grid-cols-2">

//         {/*************** Nombre ****************/ }
//         <div className="col-span-2">
//           <label htmlFor="nombre" className="label-text">Nombre</label>
//           <input
//             className={
//               clsx(
//                 "input-text",
//                 // { 'focus:border-red-500 border-red-500': errors.personas?.nombre },
//               )
//             }
//             type="text"
//             id="nombre"
//             autoFocus
//             { ...register( 'nombre', { required: true } ) }
//             placeholder="Ingrese un nombre"
//             required />
//         </div>

//         {/*************** Menus ****************/ }
//         <div className="col-span-2">
//           <label htmlFor="nombre" className="label-text">Seleccionar Menus</label>
//           {
//             menus.map( ( { id, nombre } ) => (
//               <div key={ id } className="flex items-center mb-2.5">
//                 <input
//                   id={ nombre }
//                   type="checkbox"
//                   value={ id }
//                   // onChange={ e => console.log( e.target.value ) }
//                   className="input-checkbox"
//                   { ...register( 'menus', { required: true } ) }
//                 // defaultChecked={ getValues( 'menus' ).includes( id ) }
//                 />
//                 <label htmlFor={ nombre } className="ms-2 font-medium text-gray-500 ">{ nombre }</label>
//               </div>
//             ) )
//           }
//         </div>

//       </div>

//       <div className={ "flex justify-end gap-4 pt-2" }>
//         <BtnGuardar />
//         <BtnCancelar />
//       </div>

//     </form>
//   );
// };
'use client';

import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

// import { createRol, getById, getRolesMenusById, updateRol } from '@/actions';
import { BtnCancelar, BtnGuardar } from '@/components';

type FormInputs = {
  id?: string;
  nombre: string;
  menus: string[];
};

type Menus = {
  id: string;
  nombre: string;
};

interface Props {
  id?: string;
}

const menu: Menus[] = [
  {
    id: '1',
    nombre: 'Gestión Perfil'
  },
  {
    id: '2',
    nombre: 'Gestión Roles'
  },
  {
    id: '3',
    nombre: 'Gestión Usuarios'
  }
];

export const FormRoles = ({ id }: Props) => {
  const router = useRouter(); // Para navegar a una nueva ruta.
  const pathname = usePathname(); // Para obtener la ruta actual.

  const [menus, setMenus] = useState<Menus[]>(menu); // Almacena todos los menus perteneciente al ID del Rol.
  const [isEditar, setIsEditar] = useState<boolean>(false); // Permite saber en que formulario esta en ADD o UPDATE.

  //=================== Usando React Hook Form ===================
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormInputs>();

  useEffect(() => {
    // Server Actions - Obtener los Menus por el ID
    // const fetchMenus = async () => {
    // const data = await getById();
    // setMenus(data.menus);
    // };

    // Server Action - Obtener los Menus de los Roles de Acuerdo al ID
    const loadRolToEditar = async (id: string) => {
      // const res = await getRolesMenusById(id);

      // if (res.ok) {
      //   setValue('nombre', res.data?.nombre as string);
      //   setValue('menus', res.data?.menus.map(menu => menu.id) as []);
      setIsEditar(true);
      // }
    };

    // fetchMenus();

    if (id) {
      loadRolToEditar(id);
    }
  }, [id, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { nombre, menus } = data;

    console.log({ nombre, menus });

    // var res;
    // if (!isEditar) {
    // res = await createRol({ nombre, menus });
    // }

    // if (isEditar) {
    // res = await updateRol({ id, nombre, menus });
    // }

    // if (res === undefined) return 'Error';

    // Muestra el Mensaje de Alerta Cuando Todo Sale Bien:
    if (true) {
      Swal.fire({
        position: "center",
        icon: "success",
        // title: `${res.message}`,
        title: `Guardado Exitosamente`,
        showConfirmButton: false,
        timer: 1500
      });
    }

    // Muestra el Mensaje de Alerta Cuando Algo Sale Mal:
    // if (!res.ok) {
    //   Swal.fire({
    //     position: "center",
    //     icon: "error",
    //     title: `${res.message}`,
    //     showConfirmButton: false,
    //     timer: 1500
    //   });
    // }

    router.replace(pathname);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
      <div className="grid gap-4 mb-4 grid-cols-2">
        {/*************** Nombre ****************/}
        <div className="col-span-2">
          <label htmlFor="nombre" className="label-text">Nombre</label>
          <input
            className={clsx(
              "input-text",
              errors.nombre && 'focus:border-red-500 border-red-500'
            )}
            type="text"
            id="nombre"
            autoFocus
            {...register('nombre', { required: "El nombre es obligatorio" })}
            placeholder="Ingrese un nombre"
          />
          {errors.nombre && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.nombre.message}</p>}
        </div>

        {/*************** Menus ****************/}
        <div className="col-span-2">
          <label htmlFor="menus" className="label-text">Seleccionar Menus</label>
          {menus.map(({ id, nombre }) => (
            <div key={id} className="flex items-center mb-2.5">
              <input
                id={nombre}
                type="checkbox"
                value={id}
                className="input-checkbox"
                {...register('menus', { required: "Debe seleccionar al menos un menú" })}
              />
              <label htmlFor={nombre} className="ms-2 font-medium text-gray-500">{nombre}</label>
            </div>
          ))}
          {errors.menus && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.menus.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-2">
        <BtnGuardar />
        <BtnCancelar />
      </div>
    </form>
  );
};
