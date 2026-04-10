const appointments = [
  {
    id: 1,
    patient: "Ana Torres",
    doctor: "Dr. Ramírez",
    service: "Cardiología",
    date: "2026-04-12",
    time: "10:30",
    mode: "Presencial",
    notes: "Control por chequeo anual y revisión de presión arterial.",
  },
  {
    id: 2,
    patient: "Luis Mendoza",
    doctor: "Dra. Flores",
    service: "Pediatría",
    date: "2026-04-12",
    time: "15:00",
    mode: "Presencial",
    notes: "Consulta por seguimiento de alergias estacionales.",
  },
  {
    id: 3,
    patient: "Carmen Paredes",
    doctor: "Dr. Soto",
    service: "Odontología",
    date: "2026-04-13",
    time: "09:00",
    mode: "Teleconsulta",
    notes: "Orientación previa a tratamiento y evaluación de molestias.",
  },
];

const appointmentForm = document.getElementById("appointmentForm");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const agendaGrid = document.getElementById("agendaGrid");
const appointmentModalElement = document.getElementById("appointmentModal");

const modalAppointment = appointmentModalElement
  ? new bootstrap.Modal(appointmentModalElement)
  : null;

const modalFields = {
  patient: document.getElementById("modalPatient"),
  service: document.getElementById("modalService"),
  doctor: document.getElementById("modalDoctor"),
  schedule: document.getElementById("modalSchedule"),
  mode: document.getElementById("modalMode"),
  notes: document.getElementById("modalNotes"),
};

function formatDate(dateString) {
  return new Intl.DateTimeFormat("es-PE", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
}

function showFeedback(elementId, type, message) {
  const feedback = document.getElementById(elementId);
  feedback.className = `alert alert-${type} mt-4 mb-0`;
  feedback.textContent = message;
}

function clearFeedback(elementId) {
  const feedback = document.getElementById(elementId);
  feedback.className = "alert d-none mt-4 mb-0";
  feedback.textContent = "";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function renderAppointments() {
  if (!agendaGrid) {
    return;
  }

  const sortedAppointments = [...appointments].sort((a, b) => {
    const aDate = new Date(`${a.date}T${a.time}:00`);
    const bDate = new Date(`${b.date}T${b.time}:00`);
    return aDate - bDate;
  });

  agendaGrid.innerHTML = sortedAppointments
    .map((appointment) => {
      return `
        <div class="col-md-6 col-xl-4">
          <article class="agenda-item shadow-sm">
            <span class="agenda-hour">${appointment.time}</span>
            <h3 class="h5 mt-3 mb-2">${appointment.service}</h3>
            <p class="mb-1 fw-semibold">${appointment.patient}</p>
            <p class="text-secondary mb-0">${appointment.doctor}</p>
            <div class="agenda-meta">
              <span>${formatDate(appointment.date)}</span>
              <span>${appointment.mode}</span>
            </div>
            <p class="text-secondary">${appointment.notes}</p>
            <button
              type="button"
              class="btn btn-outline-dark btn-sm view-detail-btn"
              data-id="${appointment.id}">
              Ver detalle
            </button>
          </article>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll(".view-detail-btn").forEach((button) => {
    button.addEventListener("click", () => openAppointmentModal(Number(button.dataset.id)));
  });
}

function openAppointmentModal(appointmentId) {
  const appointment = appointments.find((item) => item.id === appointmentId);

  if (!appointment || !modalAppointment) {
    return;
  }

  modalFields.patient.textContent = appointment.patient;
  modalFields.service.textContent = appointment.service;
  modalFields.doctor.textContent = appointment.doctor;
  modalFields.schedule.textContent = `${formatDate(appointment.date)} · ${appointment.time}`;
  modalFields.mode.textContent = appointment.mode;
  modalFields.notes.textContent = appointment.notes || "Sin observaciones registradas.";

  modalAppointment.show();
}

function validateRegisterForm() {
  const name = document.getElementById("registerName").value.trim();
  const dni = document.getElementById("registerDni").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const phone = document.getElementById("registerPhone").value.trim();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("registerConfirm").value;

  if (name.length < 3) {
    return "Ingresa un nombre completo válido.";
  }

  if (!/^\d{8}$/.test(dni)) {
    return "El DNI debe tener exactamente 8 dígitos.";
  }

  if (!validateEmail(email)) {
    return "Ingresa un correo electrónico válido.";
  }

  if (!/^\d{9}$/.test(phone)) {
    return "El teléfono debe tener exactamente 9 dígitos.";
  }

  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }

  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden.";
  }

  return "";
}

function validateLoginForm() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!validateEmail(email)) {
    return "Ingresa un correo electrónico válido.";
  }

  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }

  return "";
}

function validateAppointmentForm() {
  const patient = document.getElementById("patientName").value.trim();
  const doctor = document.getElementById("doctorName").value.trim();
  const service = document.getElementById("serviceSelect").value;
  const date = document.getElementById("appointmentDate").value;
  const time = document.getElementById("appointmentTime").value;
  const mode = document.getElementById("appointmentMode").value;

  if (patient.length < 3) {
    return "Ingresa el nombre del paciente.";
  }

  if (doctor.length < 3) {
    return "Ingresa el nombre del médico.";
  }

  if (!service) {
    return "Selecciona un servicio.";
  }

  if (!date) {
    return "Selecciona una fecha.";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(`${date}T00:00:00`);

  if (selectedDate < today) {
    return "La fecha de la cita no puede ser anterior al día actual.";
  }

  if (!time) {
    return "Selecciona una hora.";
  }

  if (!mode) {
    return "Selecciona la modalidad.";
  }

  const scheduleTaken = appointments.some((appointment) => {
    return appointment.date === date && appointment.time === time && appointment.doctor.toLowerCase() === doctor.toLowerCase();
  });

  if (scheduleTaken) {
    return "Ese médico ya tiene una cita registrada en la fecha y hora seleccionadas.";
  }

  return "";
}

function setMinimumAppointmentDate() {
  const appointmentDateInput = document.getElementById("appointmentDate");

  if (!appointmentDateInput) {
    return;
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  appointmentDateInput.min = `${year}-${month}-${day}`;
}

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const errorMessage = validateRegisterForm();

    if (errorMessage) {
      showFeedback("registerFeedback", "danger", errorMessage);
      return;
    }

    showFeedback("registerFeedback", "success", "Registro simulado correctamente. Ya puedes iniciar sesión en el prototipo.");
    registerForm.reset();
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const errorMessage = validateLoginForm();

    if (errorMessage) {
      showFeedback("loginFeedback", "danger", errorMessage);
      return;
    }

    showFeedback("loginFeedback", "success", "Inicio de sesión simulado exitosamente.");
    loginForm.reset();
  });
}

if (appointmentForm) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const errorMessage = validateAppointmentForm();

    if (errorMessage) {
      showFeedback("appointmentFeedback", "danger", errorMessage);
      return;
    }

    const newAppointment = {
      id: Date.now(),
      patient: document.getElementById("patientName").value.trim(),
      doctor: document.getElementById("doctorName").value.trim(),
      service: document.getElementById("serviceSelect").value,
      date: document.getElementById("appointmentDate").value,
      time: document.getElementById("appointmentTime").value,
      mode: document.getElementById("appointmentMode").value,
      notes: document.getElementById("appointmentNotes").value.trim() || "Paciente sin observaciones adicionales.",
    };

    appointments.push(newAppointment);
    renderAppointments();
    showFeedback("appointmentFeedback", "success", "Cita registrada en la agenda visual.");
    appointmentForm.reset();
  });
}

["registerName", "registerDni", "registerEmail", "registerPhone", "registerPassword", "registerConfirm"].forEach((id) => {
  const input = document.getElementById(id);
  input?.addEventListener("input", () => clearFeedback("registerFeedback"));
});

["loginEmail", "loginPassword"].forEach((id) => {
  const input = document.getElementById(id);
  input?.addEventListener("input", () => clearFeedback("loginFeedback"));
});

["patientName", "doctorName", "serviceSelect", "appointmentDate", "appointmentTime", "appointmentMode", "appointmentNotes"].forEach((id) => {
  const input = document.getElementById(id);
  input?.addEventListener("input", () => clearFeedback("appointmentFeedback"));
  input?.addEventListener("change", () => clearFeedback("appointmentFeedback"));
});

setMinimumAppointmentDate();
renderAppointments();
