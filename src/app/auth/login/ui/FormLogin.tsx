"use client";

import { useForm } from "react-hook-form";
import { FaKey, FaUserTie } from "react-icons/fa";
import { login } from "@/actions";
import { messageSweetAlert } from "@/utils";
import { useRouter } from "next/navigation";

type FormInputs = {
  email: string;
  password: string;
};

export const FormLogin = () => {
  const router = useRouter();

  // Configuración de React Hook Form con manejo de errores
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    // Llamar a la acción del servidor
    const response = await login(formData);

    // Mostrar mensaje según la respuesta
    messageSweetAlert(response.ok, response.message);

    if (response.ok) {
      // Redirigir al usuario si el login fue exitoso
      router.replace("/perfil");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full p-1 justify-start flex flex-col">
        {/*===================== Campo Email =====================*/}
        <div className="flex flex-row">
          <label
            htmlFor="email"
            className="z-highest rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0"
          >
            <FaUserTie />
          </label>
          <input
            id="email"
            className={`border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-400 w-full pl-1 ${errors.email ? "border-red-500 ring-red-400" : ""
              }`}
            placeholder="Ingresar correo"
            {...register("email", {
              required: "El correo es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo no válido",
              },
            })}
          />
        </div>
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        {/*=================== Campo Password ====================*/}
        <div className="my-4 flex flex-row">
          <label
            htmlFor="password"
            className="z-highest rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0"
          >
            <FaKey size={18} />
          </label>
          <input
            id="password"
            type="password"
            className={`h-10 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-300 w-full pl-1 ${errors.password ? "border-red-500 ring-red-400" : ""
              }`}
            placeholder="Ingresar contraseña"
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "Debe tener al menos 6 caracteres",
              },
            })}
          />
        </div>
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        {/*====================== Botón =======================*/}
        <button className="px-4 py-2 rounded bg-blue-400 text-white hover:bg-blue-600 my-4 w-full">
          Ingresar
        </button>
      </div>
    </form>
  );
};
