/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuracion de la Imagen cuando sea de google, Aqui se especifica el dominio del servidor de la imagen.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // port: "", // Deja esto vacío porque Cloudinary no utiliza un puerto específico
        // pathname: "/**", // Permitir todas las rutas
      },
    ],
  },
};

export default nextConfig;
