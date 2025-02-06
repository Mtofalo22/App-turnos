import { useState, useEffect } from "react";
import saveBooking from "../utils/saveBooking.js";
import "./BookingForm.css"; 
import { toast } from "react-toastify";

const BookingForm = () => {
  const [professionals, setProfessionals] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [turnFile, setTurnFile] = useState([]);

  const fetchTurnData = async () => {
    try {
      const response = await fetch("/db/turnFile.json");
      if (!response.ok) throw new Error("Error al cargar los turnos");
      const turnData = await response.json();
      setTurnFile(turnData.turns || []);
    } catch (error) {
      console.error("Error al cargar los turnos:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/db/dbFile.json");
        if (!response.ok) throw new Error("Error al cargar los datos");
        const data = await response.json();
        setProfessionals(data.professionals || []);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
    fetchTurnData();
  }, []);

  useEffect(() => {
    if (!selectedProfessional || !selectedService || !selectedDate) return;

    const getAvailableSlots = () => {
      const professionalData = professionals.find(
        (prof) => prof.profesionalId === Number(selectedProfessional)
      );
      if (!professionalData) return [];

      const availableHours = professionalData.horariosTrabajo || [];

      const occupiedTurns = turnFile
        .filter(
          (turn) =>
            turn.profesionalId === Number(selectedProfessional) &&
            turn.profesionId === Number(selectedService) &&
            turn.turnosOcupados.some((turno) => turno.fecha === selectedDate)
        )
        .flatMap((turn) => turn.turnosOcupados.map((turno) => turno.hora));

      return availableHours.filter((hour) => !occupiedTurns.includes(hour));
    };

    setAvailableSlots(getAvailableSlots());
  }, [selectedService, selectedProfessional, selectedDate, turnFile]);

  const handleBooking = async () => {
    if (!selectedProfessional || !selectedService || !selectedDate || !selectedSlot) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    const stillAvailable = availableSlots.includes(selectedSlot);
    if (!stillAvailable) {
      toast.warning("El turno seleccionado ya está ocupado. Por favor, elige otro horario.");
      return;
    }

    const bookingDetails = {
      professionalId: Number(selectedProfessional),
      service: selectedService,
      date: selectedDate,
      time: selectedSlot,
    };

    await saveBooking(bookingDetails);

    setSelectedProfessional("");
    setSelectedService("");
    setSelectedDate("");
    setSelectedSlot("");
    setAvailableSlots([]);

    fetchTurnData();
  };

  return (
    <div className="form-container">
    <div className="booking-card">
      <h2>Reservar Turno</h2>

      {/* Selección de Profesional */}
      <label>Selecciona un Profesional:</label>
      <select
        value={selectedProfessional}
        onChange={(e) => {
          setSelectedProfessional(e.target.value);
          setSelectedService("");
          setSelectedDate("");
          setSelectedSlot("");
        }}
      >
        <option value="">-- Selecciona un profesional --</option>
        {professionals.map((prof) => (
          <option key={prof.profesionalId} value={prof.profesionalId}>
            {prof.nombre}
          </option>
        ))}
      </select>

      {/* Selección de Servicio */}
      <label>Selecciona un Servicio:</label>
      <select
        value={selectedService}
        onChange={(e) => {
          setSelectedService(e.target.value);
          setSelectedDate("");
          setSelectedSlot("");
        }}
        disabled={!selectedProfessional} 
      >
        <option value="">-- Selecciona un servicio --</option>
        {selectedProfessional &&
          professionals
            .find((prof) => prof.profesionalId === Number(selectedProfessional))
            ?.profesiones.map((profesion) => (
              <option key={profesion.id} value={profesion.id}>
                {profesion.nombreProfesion}
              </option>
            ))}
      </select>

      {/* Selección de Fecha */}
      <label>Selecciona una Fecha:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => {
          setSelectedDate(e.target.value);
          setSelectedSlot("");
        }}
        disabled={!selectedService} 
      />

      {/* Selección de Horario */}
      <label>Selecciona un Horario:</label>
      <select
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
        disabled={!selectedDate || availableSlots.length === 0} 
      >
        <option value="">-- Selecciona un horario --</option>
        {availableSlots.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      
      <button onClick={handleBooking} disabled={!selectedSlot}>
        Reservar Turno
      </button>
    </div>
  </div>
);
};

export default BookingForm;