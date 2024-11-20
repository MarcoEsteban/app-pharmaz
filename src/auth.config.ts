import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { z } from "zod";
import prisma from "./libs/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    // ==========================================
    // Para la Implementacion de los Middlewares:
    // ==========================================
    authorized({ auth, request: { nextUrl } }) {
      const isLoggendIn = !!auth?.user; // Conviert a Boolean, retorna True ó False.
      const isOnDashboard = nextUrl.pathname.startsWith("/"); // Retorna True si se encuentra en la ruta '/', de lo contrario False.

      if (isOnDashboard) { // Si intenta acceder a la ruta '/', entra al if y se realiza una verificacion adicional.
        if (isLoggendIn) return true; // Si está Autenticado se le permite el Acceso. '/'
        return false; // Si no está Autenticado se le Redirecciona. '/auth/login'
      } else if (isLoggendIn) { // Si no intenta acceder a '/', y está Autenticado se lo Redirecciona '/'.
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },

    // =========================================================
    // Para Almacenar y Transferir Informacion de Autenticacion:
    // =========================================================
    jwt({ token, user }) {
      // User existe lo agrega dentro del Toekn.
      if (user) {
        token.data = user;
      }

      return token;
    },

    session({ session, token }) {
      // Pasar los datos del token a la session.
      session.user = token.data as any;

      return session;
    },
  },

  // ================================================================================
  // Dentro va la configuracion de [Google, GitHub, Nuestra_Propia_Autenticacion ...]
  // ================================================================================
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email({ message: "El correo es requerido" }),
            password: z.string().min(6, {
              message: "La contraseña es requerido",
            }),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Buscar el usuario con su rol y menús en la base de datos
        const user = await prisma.usuario.findUnique({
          where: { email: email.trim().toLowerCase() },
          select: {
            id: true,
            email: true,
            password: true,
            rolesId: true,
            personasId: true,
          },
        });

        // Si el usuario no existe
        if (!user) return null;

        // Verificar la contraseña
        const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
        if (!isPasswordCorrect) return null;

        // Excluir la contraseña antes de devolver el usuario
        const { password: _, ...rest } = user;

        return rest; // Aquí estás retornando el usuario con roles y menús
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
// signIn   :: Funcion por defecto de NextAuth que nos permite el inicio de session.
// signOut  :: Funcion por defecto de NextAuth que nos permite cerrar session.
// auth     :: Es el middleware
// handlers :: Esto tienen los metodos {GET && POST}, para realizar las peticiones http que el SessionProvider estan buscando.
