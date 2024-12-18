"use client";

import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { BtnCancelar, BtnGuardar } from "@/components";
import { Proveedor } from "@/interfaces";
import { proveedorSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { messageSweetAlert } from "@/utils";
import { createUpdateProveedor } from "@/actions";

type FormInputs = {
  id?: string;
  nit: string;
  nombre: string;
  celular: string;
  direccion: string;
  email: string;
};

interface Props {
  proveedor: Partial<Proveedor>;
}

export const FormProveedor = ({ proveedor }: Props) => {
  const router = useRouter(); // Para navegar a una nueva ruta.
  const pathname = usePathname(); // Para obtener la ruta actual.

  // ================
  // React Hook Form:
  // ================
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>(
    {
      resolver: zodResolver(proveedorSchema), // Aplicando el Validador de Zod.

      defaultValues: {
        nit: proveedor.nit,
        nombre: proveedor.nombre,
        celular: proveedor.celular?.toString() ?? "",
        direccion: proveedor.direccion ?? "",
        email: proveedor.email,
      },
    },
  );

  // =====================
  // Envio del Formulario:
  // =====================
  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    const { ...proveedorToSave } = data;

    if (proveedor.id) {
      formData.append("id", proveedor.id ?? "");
    }
    formData.append("nit", proveedorToSave.nit);
    formData.append("nombre", proveedorToSave.nombre);
    formData.append("celular", proveedorToSave.celular.toString());
    formData.append("direccion", proveedorToSave.direccion);
    formData.append("email", proveedorToSave.email);

    const { ok, message } = await createUpdateProveedor(formData);

    messageSweetAlert(ok, message);

    if (!ok) return router.replace(`${pathname}?modal=agregar`);

    router.replace(pathname);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 mb-4 grid-cols-2 font-sans tracking-wide">
        {/*************** NIT ****************/}
        <div className="col-span-2">
          <label htmlFor="nit" className="label-text">
            NIT <span className={"text-red-600"}>*</span>
          </label>
          <input
            className={clsx(
              "input-text",
              errors.nit && "focus:border-red-500 border-red-500",
            )}
            type="text"
            id="nit"
            autoFocus
            {...register("nit", { required: "El nit es obligatorio" })}
            placeholder="Ingrese un NIT"
          />
          {errors.nit && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.nit.message}
            </p>
          )}
        </div>

        {/*************** Nombre ****************/}
        <div className="col-span-2">
          <label htmlFor="nombre " className="label-text">
            Nombre <span className={"text-red-600"}>*</span>
          </label>
          <input
            className={clsx(
              "input-text capitalize",
              errors.nombre && "focus:border-red-500 border-red-500",
            )}
            type="text"
            id="nombre"
            {...register("nombre", { required: "El nombre es obligatorio" })}
            placeholder="Ingrese un nombre"
          />
          {errors.nombre && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.nombre.message}
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
              { "focus:border-red-500 border-red-500": errors.celular },
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
          <label htmlFor="direccion" className="label-text">Dirección</label>
          <textarea
            className={clsx(
              "input-text capitalize",
              { "focus:border-red-500 border-red-500": errors.direccion },
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
            <p className="mt-1 text-sm text-red-600 dark:text-red-500">
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
                errors.email && "focus:border-red-500 border-red-500",
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
