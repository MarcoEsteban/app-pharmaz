import NextAuth, { DefaultSession } from 'next-auth';


// Archivo de definicion de TypeScript: Esto nos va a permitir poder obtener estos datos por las session del lado del cliente.
declare module 'next-auth' {
  // interface Session {
  //   user: {
  //     id: string;
  //     email: string;
  //     personas: {
  //       ci: string;
  //       nombre: string;
  //       ap: string;
  //       am: string;
  //       genero: string;
  //       direccion: string;
  //       celular: string;
  //       foto?: string;
  //       estado: boolean;
  //     };
  //     roles: {
  //       id: string;
  //       nombre: string;
  //       estado: boolean;
  //       Menus: [
  //         {
  //           menus: {
  //             nombre: string;
  //             descripcion: string;
  //             enlace: string;
  //             icon: string;
  //           }
  //         }
  //       ]
  //     };
  //     // image?: string;
  //   } & DefaultSession[ 'user' ];
  // }

  interface Session {
    user: {
      id: string;
      email: string;
      personasId: string;
      rolesId: string;
    } & DefaultSession[ 'user' ];
  }
}
