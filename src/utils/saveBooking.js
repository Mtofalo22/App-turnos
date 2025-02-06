import { toast } from "react-toastify";

const saveBooking = async (bookingDetails) => {
  try {
    const response = await fetch("/db/turnFile.json");
    if (!response.ok) throw new Error("Error al cargar los turnos");

    const turnData = await response.json();
    let updatedTurns = [...turnData.turns];

    const existingEntry = updatedTurns.find(
      (turn) =>
        turn.profesionalId === bookingDetails.professionalId &&
        turn.profesionId === Number(bookingDetails.service)
    );

    if (existingEntry) {
      existingEntry.turnosOcupados.push({ fecha: bookingDetails.date, hora: bookingDetails.time });
    } else {
      updatedTurns.push({
        profesionalId: bookingDetails.professionalId,
        profesionId: Number(bookingDetails.service),
        turnosOcupados: [{ fecha: bookingDetails.date, hora: bookingDetails.time }],
      });
    }

    console.log("Reserva guardada correctamente:", updatedTurns);
    toast.success("¡Reserva guardada correctamente!");
  } catch (error) {
    console.error("Error al guardar la reserva:", error);
    toast.error("Hubo un problema al guardar la reserva.");
  }
};

export default saveBooking;
