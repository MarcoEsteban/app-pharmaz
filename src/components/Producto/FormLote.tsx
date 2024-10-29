'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import { BtnCancelar, BtnGuardar } from '@/components';

import { Controller, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import Autocomplete from '../ui/autocomplete/AutoComplete';
import { getUrlParams, messageSweetAlert } from '@/utils';
import { Lotes } from '@/interfaces';
import { searchProveedor } from '@/actions/producto/search/product-search-proveedor';
import { createUpdateLote } from '@/actions';

type FormInputs = {
  id?: string | null;
  stock: string;
  vencimiento: string;
  proveedorId: string;
  usuarioId: string;
  productoId: string;
};

interface Props {
  lote: Partial<Lotes>;
  productoId: string;
  usuarioId: string;
}

export const FormLote = ({ lote, productoId, usuarioId }: Props) => {
  
  const router = useRouter();     // Para navegar a una nueva ruta.
  const pathname = usePathname(); // Para obtener la ruta actual.
  const searchParams = useSearchParams(); // Obtener los parámetros de búsqueda

  // Obtener la fecha actual con formato ISO (yyyy-MM-dd)
  const today = DateTime.now().toISODate(); // Para utilizar en el atributo `min`

  // Enviar la fecha en el formato dd/MM/yyyy si es necesario
  const formatDateToCustom = (isoDate: string) => {
    return DateTime.fromISO(isoDate).toFormat("dd/MM/yyyy");
  };
  
  const getUrlParamss = getUrlParams(searchParams)

  // React Hook Form:
  const { control, handleSubmit, formState: { errors }, setError } = useForm<FormInputs>({
    // resolver: zodResolver(productoSchema), // Integración con Zod
    defaultValues: {
      id: lote.id || null,
      stock: lote.stock?.toString() || '',
      vencimiento: lote.vencimiento || '', // Cambiado a cadena vacía
      proveedorId: lote.proveedorId || '',
    }
  });
  
  // Envio del Formulario:
  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    if (data.id) {
      formData.append('id', data.id);
    }
    if (productoId && usuarioId){
      formData.append('usuarioId', usuarioId);
      formData.append('productoId', productoId);
    }

    formData.append('stock', data.stock.toString());
    formData.append('vencimiento', formatDateToCustom(data.vencimiento));
    formData.append('proveedorId', data.proveedorId);
    console.log('Datos del formulario:', data);

    // Llamada a la acción para guardar el producto
    try {
      const response = await createUpdateLote(formData);
      const params = getUrlParamss;

      console.log('Respuesta del servidor:', response);

      if (response.ok) {
        messageSweetAlert(true, response.message);
        router.replace(`${pathname}${params}`);
      } else {
        messageSweetAlert(false, 'Datos incorrectos');
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
      console.error('Error al enviar el formulario:', error);
      messageSweetAlert(false, 'Error al guardar el producto');
    }
  };

  // Esto evita que se creen nuevas funciones en cada renderizado, lo que es crucial para que React.memo funcione correctamente en Autocomplete.
  const searchProveedorFunc = useCallback(async (term: string) => {
    return await searchProveedor(term);
  }, []);

  // Memorización de displayValue
  const displayValue = useCallback((option: { id: string; nombre: string, email: string }) => option.nombre + ' (' + option.email + ')', []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 mb-4 grid-cols-4 font-sans tracking-wide">
        
        {/* Autocomplete para Proveedor */}
        <div className={clsx("col-span-4")}>
          <Controller
            name="proveedorId"
            control={control}
            rules={{ required: "El proveedor es obligatorio" }} // Regla de validación
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                label="Proveedor"
                name="proveedorId"
                value={value}
                onChange={onChange}
                fetchResults={searchProveedorFunc}
                displayValue={displayValue}
                error={error?.message}
              />
            )}
          />
        </div>

        {/*********************** stock ************************/}
        <div className={clsx("col-span-4")}>
          <label htmlFor="stock" className="label-text">Stock <span className="text-red-600">*</span></label>
          <input
            className={clsx(
              "input-text",
              errors.stock && 'focus:border-red-500 border-red-500'
            )}
            type="tel"
            id="stock"
            {...control.register('stock', { required: "El stock es obligatorio" })}
            placeholder="Ingrese el stock"
          />
          {errors.stock && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.stock.message}</p>}
        </div>

        {/*********************** Fecha ************************/}
        <div className="col-span-4">
          <label htmlFor="vencimiento" className="label-text">
            Fecha Vencimiento <span className="text-red-600">*</span>
          </label>
          <Controller
            name="vencimiento"
            control={control}
            defaultValue={today} // Valor por defecto: hoy en formato ISO
            rules={{
              required: "Fecha de vencimiento es obligatoria",
              validate: (value) => {
                return DateTime.fromISO(value) >= DateTime.now() || "La fecha no puede ser anterior a hoy";
              }
            }}
            render={({ field }) => (
              <input
                className={`input-text ${errors.vencimiento ? 'focus:border-red-500 border-red-500' : ''}`}
                type="date" // Usamos 'date' para el formato ISO
                id="vencimiento"
                min={today} // No permitir fechas anteriores a la actual
                {...field}
              />
            )}
          />
          {errors.vencimiento && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.vencimiento.message}</p>}
        </div>

      </div>

      <div className="flex justify-end gap-4 pt-2">
        <BtnCancelar />
        <BtnGuardar />
      </div>
    </form>
  );
};
