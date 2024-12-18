"use client";

import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";

import { logout, updatePerfil } from "@/actions";
import { BtnCancelar, BtnGuardar } from "@/components";
import { Usuario } from "@/interfaces";
import { messageSweetAlert } from "@/utils";

type FormInputs = {
  id?: string;
  nombre: string;
  ap: string;
  am: string;
  email: string;
  direccion: string;
  celular: string;
};

interface Props {
  user: Usuario;
}

export const FormPerfil = ({ user }: Props) => {
  const router = useRouter(); // Para navegar a una nueva ruta.
  const pathname = usePathname(); // Para obtener la ruta actual.

  // ================
  // React Hook Form:
  // ================
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>(
    {
      defaultValues: {
        nombre: user.personas.nombre,
        ap: user.personas.ap ?? "",
        am: user.personas.am ?? "",
        celular: user.personas.celular?.toString(),
        direccion: user.personas.direccion ?? "",
        email: user.email,
      },
    },
  );

  // =====================
  // Envio del Formulario:
  // =====================
  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    const { ...userToSave } = data;

    if (user.id) {
      formData.append("id", user.id ?? "");
    }
    formData.append("nombre", userToSave.nombre);
    formData.append("ap", userToSave.ap);
    formData.append("am", userToSave.am);
    formData.append("celular", userToSave.celular.toString());
    formData.append("direccion", userToSave.direccion);
    formData.append("email", userToSave.email);

    const { ok, message, dataUser } = await updatePerfil(formData);

    messageSweetAlert(ok, message);

    // Espera un momento para que el usuario vea el mensaje antes de hacer logout
    if (dataUser?.email !== user.email) {
      router.replace(pathname);
      setTimeout(async () => {
        await logout();
      }, 2000); // Espera 2000 ms (2 segundos) antes de cerrar sesión
    } else {
      // Si no hay cambio en el email, solo redirige
      router.replace(pathname);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 mb-4 grid-cols-2 font-sans tracking-wide">
        {/*************** Nombre ****************/}
        <div className="col-span-2">
          <label htmlFor="nombre" className="label-text">
            Nombre <span className={"text-red-600"}>*</span>
          </label>
          <input
            className={clsx(
              "input-text",
              errors.nombre && "focus:border-red-500 border-red-500",
            )}
            type="text"
            id="nombre"
            autoFocus
            {...register("nombre", { required: "El nombre es obligatorio" })}
            placeholder="Ingrese un nombre"
          />
          {errors.nombre && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.nombre.message}
            </p>
          )}
        </div>

        {/*************** Ap ****************/}
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="ap" className="label-text">
            Apellido P. <span className={"text-red-600"}>*</span>
          </label>
          <input
            className={clsx(
              "input-text",
              errors.ap && "focus:border-red-500 border-red-500",
            )}
            type="text"
            id="ap"
            {...register("ap", { required: "El apellido es obligatorio" })}
            placeholder="Ingrese un ap"
          />
          {errors.ap && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.ap.message}
            </p>
          )}
        </div>

        {/*************** Am ****************/}
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="am" className="label-text">
            Apellido M. <span className={"text-red-600"}>*</span>
          </label>
          <input
            className={clsx(
              "input-text",
              errors.am && "focus:border-red-500 border-red-500",
            )}
            type="text"
            id="am"
            {...register("am", { required: "El apellido es obligatorio" })}
            placeholder="Ingrese un am"
          />
          {errors.am && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.am.message}
            </p>
          )}
        </div>

        {/*************** Celular ****************/}
        <div className="col-span-2">
          <label htmlFor="celular" className="label-text">
            Celular <span className={"text-red-600"}>*</span>
          </label>
          <input
            className={clsx(
              "input-text",
              errors.celular && "focus:border-red-500 border-red-500",
            )}
            type="tel"
            id="celular"
            {...register("celular", { required: "El celular es requerido" })}
            placeholder="Ingrese un celular"
          />
          {errors.celular && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.celular.message}
            </p>
          )}
        </div>

        {/*************** Direccion ****************/}
        <div className="col-span-2">
          <label htmlFor="direccion" className="label-text">
            Dirección <span className={"text-red-600"}>*</span>
          </label>
          <textarea
            className={clsx(
              "input-text",
              errors.direccion && "focus:border-red-500 border-red-500",
            )}
            id="direccion"
            rows={2}
            {...register("direccion", {
              required: "La direccion es requerido",
            })}
            placeholder="Ingrese direccion"
          >
          </textarea>
          {errors.direccion && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.direccion.message}
            </p>
          )}
        </div>

        {/**************** Email ****************/}
        <div className="col-span-2">
          <label htmlFor="email" className="label-text">
            Email <span className={"text-red-600"}>*</span>
          </label>
          <div className="relative">
            <MdEmail className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500" />
            <input
              className={clsx(
                "input-text-icon",
                errors.direccion && "focus:border-red-500 border-red-500",
              )}
              id="email"
              type="email"
              {...register("email", { required: "El email es requerido" })}
              placeholder="nombre@ejemplo.com"
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className={"flex justify-end gap-4 pt-2"}>
        <BtnCancelar />
        <BtnGuardar />
      </div>
    </form>
  );
};
