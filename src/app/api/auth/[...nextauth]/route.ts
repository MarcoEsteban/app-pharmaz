// Esto es un Endopoint 'http://localhost:3000/api/auth/session' que automaticamente el <SessionProvider></SessionProvider> esta buscando, pasado en la 'Cookies'  para confirmar si el usuario esta autenticado o no.
// Esta ruta tenemos que crear 'api/auth/session' para el funcionamiento del <SessionProvider></SessionProvider>
// [...nextauth] :: Es un comodin que maneja todas las rutas de NextAuth, que indica cualquier Endopoint('http://localhost:3000/api/auth/session') que pase por ahi va a caer en este comodin.

import { handlers } from '@/auth.config';


// Es decir cuando llege una peticion GET || POST pasa por aqui.
export const { GET, POST } = handlers;
