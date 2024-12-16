"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { BtnCancelar, BtnGuardar } from "@/components";
import { FaUpload } from "react-icons/fa";
import { messageSweetAlert } from "@/utils";
import { uploadImage } from "@/actions";
import Image from "next/image";

type FormInputs = {
  id?: string;
  foto: FileList; // El campo foto es de tipo FileList.
};

interface Props {
  id?: string;
}

export const FormPhotoLabo = ({ id }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Estado para la vista previa.

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  // =======================================================
  // Manejar la selección de la imagen para la vista previa:
  // =======================================================
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];

      if (!allowedTypes.includes(file.type)) {
        let message =
          "Solo se permiten imágenes en formato JPG, PNG, GIF o WebP.";
        messageSweetAlert(false, message);
        return;
      }

      if (file.size > 5000000) {
        let message = "El tamaño de la imagen debe ser menor a 5MB.";
        messageSweetAlert(false, message);
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result as string); // Configura la vista previa.
      };

      reader.readAsDataURL(file);

      setSelectedFile(file); // Guarda el archivo seleccionado.
    }
    console.log(selectedFile);
  };

  const onSubmit = async (data: FormInputs) => {
    console.log("entro al onSubmit");
    const formData = new FormData();

    if (id) {
      formData.append("id", id);
    }
    formData.append("table", pathname);

    // Usa `selectedFile` en lugar del archivo directamente desde `data.foto`.
    if (selectedFile) {
      formData.append("foto", selectedFile);
    } else {
      let message = "Debes seleccionar una imagen antes de enviar.";
      messageSweetAlert(false, message);
      return;
    }

    const { ok, message } = await uploadImage(formData); // Llamar al server action.

    messageSweetAlert(ok, message);

    if (ok) {
      router.replace(pathname); // Redirige si se subió correctamente.
    } else {
      router.replace(`${pathname}?modal=foto`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center bg-white font-sans mb-4 tracking-wide">
        <label
          htmlFor="foto"
          className="cursor-pointer flex w-[300px] h-[250px] max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-1 text-center"
        >
          {previewImage
            ? (
              <Image
                src={previewImage}
                alt="Vista previa"
                className="w-full h-full object-cover rounded-xl"
                width={0}
                height={0}
              />
            )
            : (
              <>
                <FaUpload className="h-10 w-10 text-blue-500" />
                <h2 className="mt-2 text-xl font-medium text-gray-700 tracking-wide">
                  Subir una Foto
                </h2>
                <p className="mt-3 text-gray-500 tracking-wide">
                  Subir imagen en formato PNG, JPG, Webp.
                </p>
              </>
            )}
          <input
            id="foto"
            {...register("foto", {
              required: "La imagen es requerida",
            })}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange} // Solo manejarás el cambio aquí.
          />
        </label>
        {errors.foto && (
          <span className="text-red-500 mt-2">{errors.foto.message}</span>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-2">
        <BtnCancelar />
        <BtnGuardar />
      </div>
    </form>
  );
};
