"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  width: number;
  height: number;
}

export const ImagenLoad = ({
  src,
  alt,
  className,
  width,
  height,
}: Props) => {
  const pathname = usePathname();

  const localSrc = src
    ? src.startsWith("http") ? src : src
    : pathname === "/producto" || pathname === "/ventas"
      ? `/images/fondo-medical.png`
      : `/images/profile.png`;

  return (
    <Image
      className={className}
      src={localSrc}
      alt={alt}
      width={width}
      height={height}
    />
  );
};