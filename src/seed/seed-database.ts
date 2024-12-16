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
  await prisma.lotes.deleteMany();
  await prisma.detalleVentas.deleteMany();
  await prisma.ventas.deleteMany();
  await prisma.transacciones.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.roles.deleteMany();
  await prisma.personas.deleteMany();
  await prisma.proveedores.deleteMany();
  await prisma.medicaOnLabo.deleteMany();
  await prisma.medicaOnPresen.deleteMany();
  await prisma.medicaOnPrinci.deleteMany();
  await prisma.medicaOnViaAdm.deleteMany();
  await prisma.medicamentos.deleteMany();
  await prisma.presentacion.deleteMany();
  await prisma.laboratorios.deleteMany();
  await prisma.principioActivo.deleteMany();
  await prisma.viaAdministracion.deleteMany();
  // ] );

  // -------------------------------------------------------------------------------------
  // 2. Insertando los Registros a la Tablas[Menus, Roles, rolesOnMenus, personas, etc...]
  // -------------------------------------------------------------------------------------
  // Desestructuramos y Obtenemos los Datos de Nuestros Archivo Seed:
  const {
    menus,
    roles,
    personas,
    usuarios,
    proveedor,
    datafarmacia: datapharmaz,
    producto,
    presentacion,
    laboratorio,
    principioActivo,
    viaAdministracion,
    lotes,
  } = initialData;

  // ===================
  // Insert Table Menus:
  // ===================
  await prisma.menus.createMany({
    data: menus,
  });
  const menusDB = await prisma.menus.findMany({ select: { id: true } });

  // ===================
  // Insert Table Roles:
  // ===================
  await prisma.roles.createMany({
    data: roles,
  });
  const rolesDB = await prisma.roles.findMany({ select: { id: true } });

  // ==========================
  // Insert Table rolesOnMenus:
  // ==========================
  const rolesmenus = menusDB.map((menusId: any) => {
    return {
      rolesId: rolesDB[0].id,
      menusId: menusId.id,
    };
  });
  await prisma.rolesOnMenus.createMany({
    data: rolesmenus,
  });

  // ======================
  // Insert Table Personas:
  // ======================
  const personasNew = personas.map((persona) => ({
    ...persona,
    am: persona.am || "", // Asignar un valor predeterminado si está indefinido
  }));

  await prisma.personas.createMany({
    data: personasNew,
  });
  const personasDB = await prisma.personas.findMany({ select: { id: true } });

  // ======================
  // Insert Table Usuarios:
  // ======================
  const newUser = usuarios.map((user) => {
    return {
      ...user,
      personasId: personasDB[0].id,
      rolesId: rolesDB[0].id,
    };
  });

  await prisma.usuario.createMany({
    data: newUser,
  });

  // =========================
  // Insert Table Proveedores:
  // =========================
  await prisma.proveedores.createMany({
    data: proveedor,
  });

  // ==========================
  // Insert Table DatosPharmaz:
  // ==========================
  const usuarioDB = await prisma.usuario.findMany({ select: { id: true } });

  const newPharmaz = datapharmaz.map((pharmaz) => {
    return {
      ...pharmaz,
      usuarioId: usuarioDB[0].id,
    };
  });

  await prisma.datosFarmacia.createMany({
    data: newPharmaz,
  });

  // ==========================
  // Insert Table Presentacion:
  // ==========================
  await prisma.presentacion.createMany({
    data: presentacion,
  });

  // const presentacionId = await prisma.presentacion.findMany({
  //   select: { id: true },
  // });

  // ==========================
  // Insert Table laboratorios:
  // ==========================
  await prisma.laboratorios.createMany({
    data: laboratorio,
  });

  // const laboratoriosId = await prisma.laboratorios.findMany({
  //   select: { id: true },
  // });

  // =============================
  // Insert Table PrincipioActivo:
  // =============================
  await prisma.principioActivo.createMany({
    data: principioActivo,
  });

  // const principioActivoId = await prisma.principioActivo.findMany({
  //   select: { id: true },
  // });

  // ===============================
  // Insert Table viaAdministracion:
  // ===============================
  await prisma.viaAdministracion.createMany({
    data: viaAdministracion,
  });

  // const viaAdministracionId = await prisma.viaAdministracion.findMany({
  //   select: { id: true },
  // });

  // ======================
  // Insert Table Producto:
  // ======================
  await prisma.medicamentos.createMany({
    data: producto,
  });

  // ============================
  // Insert Table medicaOnPresen:
  // ============================
  const productosDB = await prisma.medicamentos.findMany({
    select: { id: true },
  });
  const presentacionDB = await prisma.presentacion.findMany({
    select: { id: true },
  });

  const mediprese = productosDB.map((item, i) => {
    return {
      productoId: item.id,
      presentacionId: presentacionDB[i].id,
    };
  });

  await prisma.medicaOnPresen.createMany({
    data: mediprese,
  });

  // ==========================
  // Insert Table medicaOnLabo:
  // ==========================
  const laboratoriosDB = await prisma.laboratorios.findMany({
    select: { id: true },
  });

  const medilabo = productosDB.map((item, i) => {
    return {
      productoId: item.id,
      laboratoriosId: laboratoriosDB[i].id,
    };
  });

  await prisma.medicaOnLabo.createMany({
    data: medilabo,
  });

  // ============================
  // Insert Table medicaOnPrinci:
  // ============================
  const principioActivoDB = await prisma.principioActivo.findMany({
    select: { id: true },
  });

  const mediprinci = productosDB.map((item, i) => {
    return {
      productoId: item.id,
      principioActivoId: principioActivoDB[i].id,
    };
  });

  await prisma.medicaOnPrinci.createMany({
    data: mediprinci,
  });

  // ============================
  // Insert Table medicaOnViaAdm:
  // ============================
  const viaAdministracionDB = await prisma.viaAdministracion.findMany({
    select: { id: true },
  });

  const medivia = productosDB.map((item, i) => {
    return {
      productoId: item.id,
      viaAdministracionId: viaAdministracionDB[i].id,
    };
  });

  await prisma.medicaOnViaAdm.createMany({
    data: medivia,
  });

  // ===================
  // Insert Table Lotes:
  // ===================
  const proveedorDB = await prisma.proveedores.findMany({
    select: { id: true },
  });

  const lotesT = lotes.map((element, i) => {
    return {
      ...element,
      productoId: productosDB[i].id,
      proveedorId: proveedorDB[0].id,
      usuarioId: usuarioDB[0].id,
    };
  });

  await prisma.lotes.createMany({
    data: lotesT,
  });

  console.log("Seed Ejecutado correctamente");
}

// ==============================
// Funcion anonima auto invocada:
// ==============================
(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
