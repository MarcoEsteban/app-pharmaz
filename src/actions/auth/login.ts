"use server";

import { signIn } from "@/auth.config";
import { revalidatePath } from "next/cache";

export const login = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData);
    const { email, password } = data;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log({ result });

    if (result?.error) {
      return { ok: false, message: result.error };
    }

    revalidatePath("/");

    return { ok: true, message: "Ingreso Exitoso" };
  } catch (error) {
    console.log({ error });
    return { ok: false, message: "Datos Incorrectos" };
  }
};

// "use server";
//
// import { signIn } from "@/auth.config";
// import { revalidatePath } from "next/cache";
//
// export const login = async (formData: FormData) => {
//   try {
//     // Convertir los datos del FormData a un objeto
//     const data = Object.fromEntries(formData);
//     const { email, password } = data;
//
//     // Intentar iniciar sesión con el proveedor de credenciales
//     const result = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//     });
//
//     // Si hay un error, devolverlo
//     if (!result?.ok) {
//       return { ok: false, message: result?.error || "Error desconocido." };
//     }
//
//     // Actualizar la cache y retornar éxito
//     revalidatePath("/");
//     return { ok: true, message: "Ingreso exitoso." };
//   } catch (error: any) {
//     // Manejar errores inesperados
//     return { ok: false, message: error.message || "Error inesperado." };
//   }
// };
