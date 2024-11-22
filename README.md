# Proyecto FullStack de Dashboard Administrativo de Compra - Venta - Inventario

## Como levantar Proyecto en Dev

Pasos para levantar la app en Desarrollo

## levantar en desarrollo

1. Ingresar en la carpeta de ```app-pharmaz``` e intalar las dependencias con el comando:
```bash
npm install
```
2. Instalar  [TablePlus](https://tableplus.com/) || [DBeaver](https://dbeaver.io)
3. Instalar  [Docker-compose](https://www.docker.com/products/docker-desktop/) y ejecutar la aplicacion.

4. Levantar la Base de Datos ```docker-compose up -d``` || ```docker compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
5. Llenar Registro  a la Base de Datos ```npm run seed``` datos iniciales para produccion
6. Levantar la aplicación:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

abrir en el navegador [http://localhost:3000](http://localhost:3000)

## Paquetes y Dependencias Utilizada en el Proyecto:

### React Icons
Para agregar iconos a nuestro App.
````
npm i react-icons
````
- [React Icons ](https://react-icons.github.io/react-icons/) - Documentación

### CLSX
Este Paquete Permite poner clases condicionales de Tailwind.
````
npm i clsx
````
- [CLSX](https://www.npmjs.com/package/clsx) - Documentación

### Zustand
Para gestionar nuestro estados globales de nuestro App.
````
npm i zustand
````
- [Zustand](https://zustand-demo.pmnd.rs/) - Documentación

### React Hook Form
Para validar y controlar los cambios en los formularios
````
npm i sweetalert2
````
- [React Hook Form](https://react-hook-form.com/) - Documentación

### SweetAlert2
Para mostrar mensaje de alerta.
````
npm i react-hook-form
````
- [Sweetalert2](https://sweetalert2.github.io/) - Documentación

### SweetAlert2-React-Content
Biblioteca sweetalert2-react-content para extender la funcionalidad de SweetAlert2 y permitir que pueda renderizar contenido de React dentro de las alertas de SweetAlert2.
````
npm i sweetalert2-react-content
````
- [sweetalert2-react-content]() - Documentación

### bcryptjs
Para encriptar y desencriptar el password
````
npm i bcryptjs
npm i @types/bcryptjs -D
````
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Documentación
