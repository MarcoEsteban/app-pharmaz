
import { Inter, Roboto_Mono } from 'next/font/google';

export const inter = Inter({subsets: ['latin']})

// Creamos Nuestra Propia Fuente
export const titleFont = Roboto_Mono({
  subsets: ['latin'],
  weight: ['500', '700']
})