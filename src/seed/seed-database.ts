import prisma from "../libs/prisma";
import { initialData } from "./seed";

async function main() {
  
  // -------------------------------------------------------------------------------------
  // 1. Borrar todos los datos de las Tablas | Borrar todos los Registros Previos
  // -------------------------------------------------------------------------------------
  // await Promise.all( [
  await prisma.rolesOnMenus.deleteMany();
  await prisma.menus.deleteMany();
  await prisma.datosFarmacia.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.proveedores.deleteMany();
  await prisma.personas.deleteMany();
  await prisma.roles.deleteMany();
  // ] );
  
  // -------------------------------------------------------------------------------------
  // 2. Insertando los Registros a la Tablas[Menus, Roles, rolesOnMenus, personas, etc...]
  // -------------------------------------------------------------------------------------
  // Desestructuramos y Obtenemos los Datos de Nuestros Archivo Seed:
  const {menus, roles, personas, usuarios, proveedor, datafarmacia: datapharmaz} = initialData;

  // ===================
  // Insert Table Menus:
  // ===================
  await prisma.menus.createMany({
    data: menus
  })
  const menusDB = await prisma.menus.findMany({select: {id: true}})
  
  // ===================
  // Insert Table Roles:
  // ===================
  await prisma.roles.createMany({
    data: roles
  })
  const rolesDB = await prisma.roles.findMany({select: {id: true}})
  
  // ==========================
  // Insert Table rolesOnMenus:
  // ==========================
  const rolesmenus = menusDB.map( (menusId: any) => {
    return {
      rolesId: rolesDB[0].id,
      menusId: menusId.id
    }
  })
  await prisma.rolesOnMenus.createMany({
    data: rolesmenus
  })
  
  // ======================
  // Insert Table Personas:
  // ======================
  const personasNew = personas.map(persona => ({
    ...persona,
    am: persona.am || '', // Asignar un valor predeterminado si está indefinido
  }));

  await prisma.personas.createMany({
    data: personasNew
  });
  const personasDB = await prisma.personas.findMany({select: {id: true}})
  
  // ======================
  // Insert Table Usuarios:
  // ======================
  const newUser = usuarios.map( user => {
    return {
      ...user,
      personasId: personasDB[ 0 ].id,
      rolesId: rolesDB[ 0 ].id
    };
  });
  
  await prisma.usuario.createMany( {
    data: newUser
  } );

  // =========================
  // Insert Table Proveedores:
  // =========================
  const newProvedor = proveedor.map( proveedor => {
    return {
      ...proveedor,
      personasId: personasDB[ 1 ].id,
    };
  });
  
  await prisma.proveedores.createMany( {
    data: newProvedor
  } );
  
  // ==========================
  // Insert Table DatosPharmaz:
  // ==========================
  const usuarioDB = await prisma.usuario.findMany({select: {id: true}})
  
  const newPharmaz = datapharmaz.map( pharmaz => {
    return {
      ...pharmaz,
      usuarioId: usuarioDB[0].id
    }
  })

  await prisma.datosFarmacia.createMany({
    data: newPharmaz
  })
  
  console.log( 'Seed Ejecutado correctamente' );
  
}


// ==============================
// Funcion anonima auto invocada:
// ==============================
( () => {

  if ( process.env.NODE_ENV === 'production' ) return;

  main();
} )();
