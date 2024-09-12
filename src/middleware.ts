
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth( authConfig ).auth;

export const config = {
  /* ===============================================================
   * https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
   * 
   * matcher :: Define que rutas deben ejecutarse en el middleware.
   * 
   * En este caso, estás configurando que el middleware se ejecute en todas las rutas de la aplicación, excepto en:
   *    API routes (/api).
   *    Recursos estáticos (/_next/static, /_next/image).
   *    Archivos PNG (*.png).
   =================================================================*/ 
  matcher: [ '/((?!api|_next/static|_next/image|.*\\.png$).*)' ],
};
