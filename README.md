# Reserva de Turnos

Este proyecto es una aplicación de reservas de turnos desarrollada en **React.js**. La aplicación permite a los usuarios seleccionar un profesional, elegir un servicio, una fecha y un horario disponible para realizar la reserva.

## Tecnologías utilizadas
- **React.js**
- **React Hook Form** (para validación de formularios)
- **React Toastify** (para notificaciones)
- **React DatePicker** (para la selección de fechas)

## Instalación
Para comenzar con el desarrollo, sigue estos pasos:

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu_usuario/reserva-turnos.git
   cd reserva-turnos
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```sh
   npm start
   ```

## Estructura del Proyecto
```
reserva-turnos/
│── src/
│   ├── components/
│   │   ├── BookingForm.jsx
│   │   ├── BookingForm.css
│   ├── utils/
│   │   ├── saveBooking.js
│   ├── App.jsx
│   ├── index.js
│── public/
│── package.json
│── README.md
```

## Funcionalidades
- **Formulario interactivo**: La vista del formulario es estática, pero las opciones se habilitan progresivamente al completar los campos anteriores.
- **Selección de profesional**: Lista desplegable con los profesionales disponibles.
- **Selección de servicio**: Se carga dinámicamente según el profesional elegido.
- **Selección de fecha y horario**: Se filtran los horarios disponibles en base a los turnos ocupados.
- **Notificaciones**: Se utiliza `react-toastify` para mostrar mensajes de confirmación.

## Mejoras futuras
- Integración con backend para persistencia de datos.
- Gestión de usuarios y autenticación.
- Envío de correos de confirmación de turnos.

---
### Autor
**Mauricio Tofalo** - [GitHub](https://github.com/Mtofalo22)

