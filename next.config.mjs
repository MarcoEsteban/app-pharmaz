/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuracion de la Imagen cuando sea de google, Aqui se especifica el dominio del servidor de la imagen.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  }
};

export default nextConfig;
