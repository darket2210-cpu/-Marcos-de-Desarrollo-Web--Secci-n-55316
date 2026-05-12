/**
 * app.js — Versión Spring Boot + Thymeleaf
 *
 * El renderizado de la agenda y la validación de formularios
 * ahora los maneja el servidor (PacienteController / UsuarioController).
 *
 * Este archivo solo maneja lógica de UI:
 *   1. Abrir el modal con los datos de la cita seleccionada
 *   2. Limpiar alertas al escribir en los campos
 */

// ─── 1. MODAL DE DETALLE ────────────────────────────────────────────────────
// Cada article.agenda-item tiene atributos data-* puestos por Thymeleaf.
// Al hacer clic en "Ver detalle", leemos esos datos y los mostramos en el modal.

document.querySelectorAll(".view-detail-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    var card = button.closest("article");

    if (!card) return;

    // Leer los data-* que Thymeleaf escribió en el article
    document.getElementById("modalPatient").textContent  = card.dataset.patient  || "";
    document.getElementById("modalService").textContent  = card.dataset.service  || "";
    document.getElementById("modalDoctor").textContent   = card.dataset.doctor   || "";
    document.getElementById("modalSchedule").textContent = card.dataset.schedule || "";
    document.getElementById("modalMode").textContent     = card.dataset.mode     || "";
    document.getElementById("modalNotes").textContent    = card.dataset.notes    || "Sin observaciones registradas.";

    // Abrir el modal de Bootstrap
    var modalEl = document.getElementById("appointmentModal");
    if (modalEl) {
      new bootstrap.Modal(modalEl).show();
    }
  });
});

// ─── 2. LIMPIAR ALERTAS AL ESCRIBIR ─────────────────────────────────────────
// Oculta los mensajes de error/éxito cuando el usuario empieza a corregir.
// (Los mensajes de error del servidor se muestran solo al cargar la página.)

document.querySelectorAll("input, select, textarea").forEach(function (el) {
  ["input", "change"].forEach(function (event) {
    el.addEventListener(event, function () {
      document.querySelectorAll(".alert:not(.d-none)").forEach(function (alert) {
        // Solo ocultamos alertas de error, no las de éxito (flash messages)
        if (alert.classList.contains("alert-danger")) {
          alert.classList.add("d-none");
        }
      });
    });
  });
});