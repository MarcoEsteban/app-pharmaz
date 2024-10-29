import bcryptjs from 'bcryptjs'

interface SeedMenus {
  id?: string;
  nombre: string;
  enlace: string;
  icon: string;
}

interface SeedRoles {
  id?: string;
  nombre: string;
  estado?: boolean;
}

interface SeedPersonas {
  id?: string;
  ci: string;
  nombre: string;
  ap: string;
  am?: string;
  direccion?: string;
  celular: number;
  foto?: string;
  estado?: boolean;
}

interface SeedUser {
  id?: string;
  email: string;
  password: string;
  personasId: string;
  rolesId: string;
}

interface SeedProveedores {
  id?: string;
  nit: string;
  nombre: string;
  celular: number;
  direccion: string;
  email: string;
}

interface SeedDatosFarmacia {
  id?: string;
  nombre: string;
  email: string; 
  celular: number;
  direccion: string;
  foto?: string;
  usuarioId: string;
}

type SeedProducto = {
  id?: string;
  categoria: string;
  nombre: string;
  concentracion: string;
  adicional: string;
  precio: number;
  receta: string;
  tipo: string;
  foto?: string;
  estado?: boolean;
};

interface SeedPresentacion {
  id?: string;
  nombre: string;
  estado?: boolean;
}

interface SeedLaboratorio {
  id?: string;
  nombre: string;
  foto?: string;
  estado?: boolean;
}

interface SeedPrincipioActivo {
  id?: string;
  nombre: string;
  estado?: boolean;
}

interface SeedViaAdministraciion {
  id?: string;
  nombre: string;
  estado?: boolean;
}

interface SeedLotes {
  id?: string;
  stock: number;
  vencimiento: Date;
  productoId: string;
  proveedorId: string;
  usuarioId: string;
  estado?: boolean;
}

interface SeedData {
  menus: SeedMenus[];
  roles: SeedRoles[];
  personas: SeedPersonas[];
  usuarios: SeedUser[];
  proveedor: SeedProveedores[];
  datafarmacia: SeedDatosFarmacia[];
  producto: SeedProducto[];
  presentacion: SeedPresentacion[];
  laboratorio: SeedLaboratorio[];
  principioActivo: SeedPrincipioActivo[];
  viaAdministracion: SeedViaAdministraciion[];
  lotes: SeedLotes[];
}

export const initialData: SeedData = {
  menus: [

    // Usuario
    {
      nombre: 'Gestión Perfil',
      icon: "FaCircleUser",
      enlace: '/perfil',
    },
    {
      nombre: 'Gestión Roles',
      icon: "FaUserGroup",
      enlace: '/roles',
    },
    {
      nombre: 'Gestión Usuario',
      icon: "FaUserSecret",
      enlace: '/usuarios'
    },
    {
      nombre: 'Adm. Datos Farmacia',
      icon: "FaBuildingUser",
      enlace: '/data_farmacia'
    },

    // Almacen
    {
      nombre: 'Gestión Producto',
      icon: "FaPills",
      enlace: '/producto'
    },
    {
      nombre: 'Gestión Atributos',
      icon: "FaTags",
      enlace: '/atributos'
    },
    {
      nombre: 'Gestión Lotes',
      icon: "FaCubes",
      enlace: '/lotes'
    },

    // Compras
    {
      nombre: 'Gestión Proveedor',
      icon: "FaTruckMedical",
      enlace: '/proveedor'
    },

    // Ventas
    {
      nombre: 'Gestión Cliente',
      icon: "FaUserTie",
      enlace: '/cliente'
    },
    {
      nombre: 'Gestión Venta',
      icon: "FaCashRegister",
      enlace: '/ventas'
    },
    {
      nombre: 'Adm. Ventas Realizadas',
      icon: "FaMoneyCheckDollar",
      enlace: '/ventas_realizadas'
    },

    //Reportes
    {
      nombre: 'Gestión Reportes',
      icon: "FaFilePdf",
      enlace: '/reportes'
    },
  ],
  
  roles: [
    {
      nombre: 'Administrador'
    }
  ],

  personas: [
    {
      ci: '7199534',
      nombre: 'Marco',
      ap: 'Campos',
      am: 'Subelza',
      direccion: 'B./Andaluz',
      celular: 78952545
    },
    {
      ci: '7199532',
      nombre: 'Angel',
      ap: 'Gutierrez',
      am: 'Peralta',
      direccion: 'B./ Lindo',
      celular: 78967542,
    },
  ],

  usuarios: [
    {
      email: 'marcocampos@google.com',
      password: bcryptjs.hashSync( '1234567' ),
      personasId: '',
      rolesId: ''
    },
  ],
  
  proveedor: [
    {
      nit: '7199532',
      nombre: 'Terbol',
      direccion: 'B./ Lindo',
      celular: 78967542,
      email: 'terbol@google.com',
    },
  ],
  
  datafarmacia: [
    {
      nombre: 'Pharmaz',
      email: 'pharmaz@google.com',
      direccion: 'C./ Sobre la Junin frente al Hospital San Juan de Dios',
      celular: 77952541,
      foto: '',
      usuarioId: '',
    },
  ],
  
  producto: [
    {
      categoria: 'Farmacos',
      nombre: 'Paracetamol',
      concentracion: '0.5ml',
      adicional: 'CJAS X 500',
      precio: 3.5,
      receta: 'No',
      tipo: 'Generico',
    },
    {
      categoria: 'Farmacos',
      nombre: 'Libbera',
      concentracion: '0.5ml',
      adicional: 'CJAS X 10',
      precio: 4.5,
      receta: 'No',
      tipo: 'Comercial',
    },
  ],
  
  presentacion: [
    {
      nombre: 'Comprimido'
    },
    {
      nombre: 'Tabletas'
    }
  ],
  
  laboratorio: [
    {
      nombre: 'Cofar'
    },
    {
      nombre: 'Promedical'
    }
  ],
  
  viaAdministracion: [
    {
      nombre: 'Rectal'
    },
    {
      nombre: 'Oral'
    }
  ],
  
  principioActivo: [
    {
      nombre: 'Paracetamol'
    },
    {
      nombre: 'Levocetirizina'
    }
  ],
  
  lotes: [
    {
      stock: 18,
      vencimiento: new Date('2026-03-29'),
      productoId: '',
      proveedorId: '',
      usuarioId: ''
    },
    {
      stock: 25,
      vencimiento: new Date('2026-02-12'),
      productoId: '',
      proveedorId: '',
      usuarioId: ''
    },
  ],
}
