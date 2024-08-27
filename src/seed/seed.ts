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
  estado?: boolean;
}

interface SeedData {
  menus: SeedMenus[];
  roles: SeedRoles[];
  personas: SeedPersonas[];
  usuarios: SeedUser[];
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
      direccion: '',
      celular: 78952545
    },
    {
      ci: '7199532',
      nombre: 'Angel',
      ap: 'Gutierrez',
      am: 'Peralta',
      direccion: '',
      celular: 78967542,
    },
  ],

  usuarios: [
    {
      email: 'fredy@google.com',
      password: bcryptjs.hashSync( '123456' ),
      personasId: '',
      rolesId: ''
    },
  ],
}
