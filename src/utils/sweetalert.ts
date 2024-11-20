import Swal from "sweetalert2";

export const messageSweetAlert = (
  ok: boolean | undefined,
  message: string | undefined,
) => {
  // Muestra el Mensaje de Alerta Cuando Todo Sale Bien:
  if (ok) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${message}`,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  // Muestra el Mensaje de Alerta Cuando Algo Sale Mal:
  if (!ok) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `${message}`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
