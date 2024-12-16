"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { BtnCancelar, BtnGuardar } from "@/components";

import { Controller, useForm, useWatch } from "react-hook-form";
import { getUrlParams, messageSweetAlert } from "@/utils";
import {
  searchLaboratorio,
  searchPresentaciones,
  searchPrincipioActivo,
  searchViaAdministracion,
} from "@/actions";
import Autocomplete from "../ui/autocomplete/AutoComplete";
import { createUpdateProducto } from "@/actions/producto/product-create-update";
import { useCategoriaStore } from "@/store";
import { useCallback } from "react";

type FormInputs = {
  id?: string | null;
  categoria: string;
  nombre: string;
  concentracion: string;
  adicional: string;
  precio: number;
  receta: string;
  tipo: string;
  presentacionId: string;
  laboratoriosId: string;
  principioActivoId: string;
  viaAdministracionId: string;
};

interface Props {
  producto: Partial<FormInputs>;
}

export const FormProducto = ({ producto }: Props) => {
  const router = useRouter(); // Para navegar a una nueva ruta.
  const pathname = usePathname(); // Para obtener la ruta actual.
  const categoria = useCategoriaStore((state) => state.categoria);
  const searchParams = useSearchParams(); // Obtener los parámetros de búsqueda

  const getUrlParamss = getUrlParams(searchParams);

  // React Hook Form:
  const { control, handleSubmit, formState: { errors }, setError } = useForm<
    FormInputs
  >({
    // resolver: zodResolver(productoSchema), // Integración con Zod
    defaultValues: {
      id: producto.id || null,
      categoria: producto.categoria || "Farmacos",
      nombre: producto.nombre || "",
      concentracion: producto.concentracion || "",
      adicional: producto.adicional || "",
      precio: producto.precio || 0,
      receta: producto.receta ?? "No",
      tipo: producto.tipo || "", // Cambiado a cadena vacía
      presentacionId: producto.presentacionId || "",
      laboratoriosId: producto.laboratoriosId || "",
      principioActivoId: producto.principioActivoId || "",
      viaAdministracionId: producto.viaAdministracionId || "",
    },
  });

  // Envio del Formulario:
  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    if (data.id) {
      formData.append("id", data.id);
    }

    formData.append("categoria", categoria);
    formData.append("nombre", data.nombre);
    formData.append("concentracion", data.concentracion);
    formData.append("adicional", data.adicional);
    formData.append("precio", data.precio.toString());
    formData.append("receta", data.receta);
    formData.append("tipo", data.tipo);
    formData.append("laboratoriosId", data.laboratoriosId);
    formData.append("presentacionId", data.presentacionId);
    formData.append("principioActivoId", data.principioActivoId);
    formData.append("viaAdministracionId", data.viaAdministracionId);

    console.log("Datos del formulario:", data);

    // Llamada a la acción para guardar el producto
    try {
      const response = await createUpdateProducto(formData);
      const params = getUrlParamss;

      console.log("Respuesta del servidor:", response);

      if (response.ok) {
        messageSweetAlert(true, response.message);
        router.replace(`${pathname}${params}`);
      } else {
        messageSweetAlert(false, "Datos incorrectos");
        if (response.errors) {
          // response.errors es un objeto con los errores de Zod
          for (const [field, messages] of Object.entries(response.errors)) {
            if (messages) {
              setError(field as keyof FormInputs, {
                type: "server",
                message: messages.join(", "),
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      messageSweetAlert(false, "Error al guardar el producto");
    }
  };

  // Esto evita que se creen nuevas funciones en cada renderizado, lo que es crucial para que React.memo funcione correctamente en Autocomplete.
  const searchPresentacionFunc = useCallback(async (term: string) => {
    return await searchPresentaciones(term);
  }, []);

  const searchLaboratorioFunc = useCallback(async (term: string) => {
    return await searchLaboratorio(term);
  }, []);

  const searchPrincipioActivoFunc = useCallback(async (term: string) => {
    return await searchPrincipioActivo(term);
  }, []);

  const searchViaAdmiFunc = useCallback(async (term: string) => {
    return await searchViaAdministracion(term);
  }, []);

  // Memorización de displayValue
  const displayValue = useCallback(
    (option: { id: string; nombre: string }) => option.nombre,
    [],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 mb-4 grid-cols-4 font-sans tracking-wide">
        {/* Nombre */}
        <div
          className={clsx("col-span-3", {
            "col-span-4": categoria !== "Farmacos",
          })}
        >
          <label htmlFor="nombre" className="label-text">
            Nombre <span className="text-red-600">*</span>
          </label>
          <input
            className={clsx(
              "input-text",
              errors.nombre && "focus:border-red-500 border-red-500",
            )}
            type="text"
            id="nombre"
            {...control.register("nombre", {
              required: "El nombre es obligatorio",
            })}
            placeholder="Ingrese un nombre"
          />
          {errors.nombre && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.nombre.message}
            </p>
          )}
        </div>

        {/* Concentracion (Solo Farmacos) */}
        {categoria === "Farmacos" && (
          <div className={clsx("col-span-1", { "col-span-2": producto.id })}>
            <label htmlFor="concentracion" className="label-text">
              Concentración <span className="text-red-600">*</span>
            </label>
            <input
              className={clsx(
                "input-text",
                errors.concentracion && "focus:border-red-500 border-red-500",
              )}
              type="text"
              id="concentracion"
              {...control.register("concentracion", {
                required: "La concentración es obligatoria",
              })}
              placeholder="Ingrese la concentración"
            />
            {errors.concentracion && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.concentracion.message}
              </p>
            )}
          </div>
        )}

        {/* Adicional (Solo Farmacos) */}
        <div className="col-span-4">
          <label htmlFor="adicional" className="label-text">
            Adicional <span className="text-red-600">*</span>
          </label>
          <input
            className={clsx(
              "input-text uppercase placeholder:capitalize",
              errors.adicional && "focus:border-red-500 border-red-500",
            )}
            type="text"
            id="adicional"
            {...control.register("adicional", {
              required: "El campo adicional es obligatorio",
            })}
            placeholder="Ingrese información adicional"
          />
          {errors.adicional && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.adicional.message}
            </p>
          )}
        </div>

        {/* Precio */}
        <div
          className={clsx("col-span-2", {
            "col-span-4": categoria !== "Farmacos",
          })}
        >
          <label htmlFor="precio" className="label-text">
            Precio <span className="text-red-600">*</span>
          </label>
          <input
            className={clsx(
              "input-text",
              errors.precio && "focus:border-red-500 border-red-500",
            )}
            type="number" // Cambiado a 'number' para facilitar la validación
            step="0.01"
            id="precio"
            {...control.register("precio", {
              required: "El precio es obligatorio",
              min: {
                value: 0.01,
                message: "El precio debe ser un número positivo",
              },
              validate: (value) =>
                /^\d+(\.\d{1,2})?$/.test(value.toString()) ||
                "El precio debe tener hasta 2 decimales",
            })}
            placeholder="Ingrese el precio"
          />
          {errors.precio && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.precio.message}
            </p>
          )}
        </div>

        {/* Receta (Solo Farmacos) */}
        {categoria === "Farmacos" && (
          <div className="col-span-1">
            <label htmlFor="receta" className="label-text">Receta</label>
            <select
              id="receta"
              className={clsx(
                "input-select",
                errors.receta && "focus:border-red-500 border-red-500",
              )}
              {...control.register("receta", {
                required: "La receta es obligatoria",
              })}
            >
              <option value="No" className="tracking-wide">Sin Receta</option>
              <option value="Si" className="tracking-wide">Con Receta</option>
            </select>
            {errors.receta && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.receta.message}
              </p>
            )}
          </div>
        )}

        {/* Tipo (Solo Farmacos) */}
        {categoria === "Farmacos" && (
          <div className="col-span-1">
            <label htmlFor="tipo" className="label-text">Tipo</label>
            <div className="flex gap-2">
              <select
                id="tipo"
                className={clsx(
                  "input-select",
                  errors.tipo && "focus:border-red-500 border-red-500",
                )}
                {...control.register("tipo", {
                  required: "El tipo es obligatorio",
                })}
              >
                <option value="" className="tracking-wide" disabled>
                  Seleccionar...
                </option>
                <option value="Comercial" className="tracking-wide">
                  Comercial
                </option>
                <option value="Generico" className="tracking-wide">
                  Genérico
                </option>
              </select>
            </div>
            {errors.tipo && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.tipo.message}
              </p>
            )}
          </div>
        )}

        {/* Autocomplete para Presentación (Solo Fármacos) */}
        {categoria === "Farmacos" && (
          <div className="col-span-2">
            <Controller
              name="presentacionId"
              control={control}
              rules={{ required: "La presentación es obligatoria" }} // Regla de validación
              render={(
                { field: { onChange, value }, fieldState: { error } },
              ) => (
                <Autocomplete
                  label="Presentación"
                  name="presentacionId"
                  value={value}
                  onChange={onChange}
                  fetchResults={searchPresentacionFunc}
                  // displayValue={(option) => `${option.nombre}`}
                  displayValue={displayValue}
                  error={error?.message}
                />
              )}
            />
          </div>
        )}

        {/* Autocomplete para Laboratorio */}
        <div
          className={clsx("col-span-2", {
            "col-span-4": categoria !== "Farmacos",
          })}
        >
          <Controller
            name="laboratoriosId"
            control={control}
            rules={{ required: "El laboratorio es obligatorio" }} // Regla de validación
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                label="Laboratorio"
                name="laboratorioId"
                value={value}
                onChange={onChange}
                fetchResults={searchLaboratorioFunc}
                // displayValue={(option) => `${option.nombre}`}
                displayValue={displayValue}
                error={error?.message}
              />
            )}
          />
        </div>

        {/* Autocomplete para Principio Activo (Solo Fármacos) */}
        {categoria === "Farmacos" && (
          <div className="col-span-2">
            <Controller
              name="principioActivoId"
              control={control}
              rules={{ required: "El principio activo es obligatorio" }} // Regla de validación
              render={(
                { field: { onChange, value }, fieldState: { error } },
              ) => (
                <Autocomplete
                  label="Principio Activo"
                  name="principioActivoId"
                  value={value}
                  onChange={onChange}
                  fetchResults={searchPrincipioActivoFunc}
                  // displayValue={(option) => `${option.nombre}`}
                  displayValue={displayValue}
                  error={error?.message}
                />
              )}
            />
          </div>
        )}

        {/* Autocomplete para Vía Administración (Solo Fármacos) */}
        {categoria === "Farmacos" && (
          <div className="col-span-2">
            <Controller
              name="viaAdministracionId"
              control={control}
              rules={{ required: "La vía de administración es obligatoria" }} // Regla de validación
              render={(
                { field: { onChange, value }, fieldState: { error } },
              ) => (
                <Autocomplete
                  label="Vía Administración"
                  name="viaAdministracionId"
                  value={value}
                  onChange={onChange}
                  fetchResults={searchViaAdmiFunc}
                  // displayValue={(option) => `${option.nombre}`}
                  displayValue={displayValue}
                  error={error?.message}
                />
              )}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-2">
        <BtnCancelar />
        <BtnGuardar />
      </div>
    </form>
  );
};

// {/* Categoria */}
// { !producto.id && (
//   <div className={clsx("col-span-1", {'col-span-4': categoria !== 'Farmacos'})}>
//     <label htmlFor="categoria" className="label-text">Categoria</label>
//     <div className="flex gap-2">
//       <select
//         id="categoria"
//         className={clsx("input-select", errors.categoria && 'focus:border-red-500 border-red-500')}
//         {...control.register('categoria', { required: "La categoría es obligatoria" })}
//       >
//         <option value="Farmacos" className="tracking-wide">Farmacos</option>
//         <option value="Instrumento Médico" className="tracking-wide">Instrumento Médico</option>
//       </select>
//     </div>
//     {errors.categoria && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.categoria.message}</p>}
//   </div>
// )}
