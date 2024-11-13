"use client";

import { usePathname, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { BtnCancelar, BtnGuardar, Password } from "@/components";
import { messageSweetAlert } from "@/utils";
import { logout, updatePasswordPerfil } from "@/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { perfilPasswordSchema } from "@/validations";

type FormInputs = {
  id?: string;
  password: string;
  password_new: string;
  confirm_password: string;
};
interface Props {
  id?: string;
}

export const FormPasswd = ({ id }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  // ================
  // React Hook Form:
  // ================
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>(
    {
      resolver: zodResolver(perfilPasswordSchema), // Aplicando el Validador de Zod.
    },
  );

  // =====================
  // Envio del Formulario:
  // =====================
  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    const { ...userToSave } = data;

    if (id) {
      formData.append("id", id);
    }
    formData.append("password", userToSave.password);
    formData.append("password_new", userToSave.password_new);
    formData.append("confirm_password", userToSave.confirm_password);

    const { ok, message } = await updatePasswordPerfil(formData);

    messageSweetAlert(ok, message);

    if (!ok) return router.replace(`${pathname}?modal=password`);

    // Espera un momento para que el usuario vea el mensaje antes de hacer logout
    if (ok) {
      router.replace(pathname);
      setTimeout(async () => {
        await logout();
      }, 2000); // Espera 2000 ms (2 segundos) antes de cerrar sesión
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 grid-cols-1 font-sans tracking-wide">
        {/**************** Password ****************/}
        <div className="col-span-2">
          <label htmlFor="password" className="label-text">
            Contraseña Actual
          </label>
          <Password
            placeholder={"Ingrese contraseña actual"}
            id={"password"}
            register={register}
            errors={errors}
          />
        </div>
        {/**************** Nuevo Password ****************/}
        <div className="col-span-2">
          <label htmlFor="password_new" className="label-text">
            Contraseña Nueva
          </label>
          <Password
            placeholder={"Ingrese contraseña nueva"}
            id={"password_new"}
            register={register}
            errors={errors}
          />
        </div>

        {/**************** Confirm Password ****************/}
        <div className="col-span-2">
          <label htmlFor="confirm_password" className="label-text">
            Confirmar Contraseña
          </label>
          <Password
            placeholder={"Confirmar contraseña"}
            id={"confirm_password"}
            register={register}
            errors={errors}
          />
        </div>

        <div className={"flex justify-end gap-4 pt-2"}>
          <BtnCancelar />
          <BtnGuardar />
        </div>
      </div>
    </form>
  );
};
