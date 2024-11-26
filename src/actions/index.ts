// AUTH
export { login } from "./auth/login";
export { logout } from "./auth/logout";

// Menus
export { getAllMenus } from "./menus/menus-get-all";

// Roles
export { getPaginationRoles } from "./roles/roles-pagination";
export { toggleStateRoles } from "./roles/roles-toggle-state";
export { getByIdRoles } from "./roles/roles-get-by-id";
export { createUpdateRoles } from "./roles/roles-create-update";

// DatoFarmacia
export { getByIdFarma } from "./datofarmacia/farma-get-by-id";
export { updateFarma } from "./datofarmacia/farma-update";

// Perfil
export { updatePerfil } from "./perfil/perfil-update";
export { updatePasswordPerfil } from "./perfil/perfil-update-password";

// Usuario
export { getPaginationUser } from "./usuarios/user-pagination";
export { toggleStateUsuario } from "./usuarios/user-toggle-state";
export { createUpdateUser } from "./usuarios/user-create-update";
export { getByIdUser } from "./usuarios/user-get-by-id";
export { updatePasswordUser } from "./usuarios/user-update-password";

// Proveedor
export { getPaginationProveedor } from "./proveedor/prov-pagination";
export { toggleStateProveedor } from "./proveedor/prov-toggle-state";
export { createUpdateProveedor } from "./proveedor/prov-create-update";
export { getByIdProveedor } from "./proveedor/prov-get-by-id";

// Cliente
export { getPaginationCliente } from "./cliente/cliente-pagination";
export { getByIdCliente } from "./cliente/cliente-get-by-id";
export { createUpdateCliente } from "./cliente/cliente-create-update";

// Atributos
// Tipos
export { createUpdatePrinciAct } from "./atributo/principioactivo/princi-create-update";
export { getByIdPrinciAct } from "./atributo/principioactivo/princi-get-by-id";
export { getPaginationPrinciAct } from "./atributo/principioactivo/princi-pagination";
export { toggleStatePrinciAct } from "./atributo/principioactivo/princi-toggle-state";

// Laboratorio
export { createUpdateLabo } from "./atributo/laboratorio/labo-create-update";
export { getByIdLabo } from "./atributo/laboratorio/labo-get-by-id";
export { getPaginationLabo } from "./atributo/laboratorio/labo-pagination";
export { toggleStateLabo } from "./atributo/laboratorio/labo-toggle-state";

// Presentacion
export { createUpdatePresent } from "./atributo/presentacion/present-create-update";
export { getByIdPresent } from "./atributo/presentacion/present-get-by-id";
export { getPaginationPresent } from "./atributo/presentacion/present-pagination";
export { toggleStatePresent } from "./atributo/presentacion/present-toggle-state";

// Via Administracion
export { createUpdateViaAdm } from "./atributo/viaadminist/viaadm-create-update";
export { getByIdViaAdm } from "./atributo/viaadminist/viaadm-get-by-id";
export { getPaginationViaAdm } from "./atributo/viaadminist/viaadm-pagination";
export { toggleStateViaAdm } from "./atributo/viaadminist/viaadm-toggle-state";

// Producto
export { searchPresentaciones } from "./producto/search/product-search-presentacion";
export { searchLaboratorio } from "./producto/search/product-search-laboratorio";
export { searchPrincipioActivo } from "./producto/search/product-search-principio-activo";
export { searchViaAdministracion } from "./producto/search/product-search-via-administra";

export { createUpdateProducto } from "./producto/product-create-update";
export { getByIdProducto } from "./producto/product-get-by-id";
export { getPaginationProducto } from "./producto/product-pagination";
export { toggleStateProducto } from "./producto/product-toggle-state";

// Lotes
export { getPaginationLotes } from "./lotes/lotes-pagination";
export { getByIdLote } from "./lotes/lote-get-by-id";
export { createUpdateLote } from "./lotes/lote-create-update";
export { toggleStateLote } from "./lotes/lote-toggle-state";

// Ventas
export { searchCliente } from "./ventas/venta-search-cliente";

// Imagen
export { uploadImage } from "./imagen/upload-image";
