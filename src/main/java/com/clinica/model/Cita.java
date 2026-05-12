package com.clinica.model;

import jakarta.validation.constraints.*;

public class Cita {
	private Long id;

    @NotBlank(message = "El nombre del paciente es obligatorio")
    @Size(min = 3, message = "Nombre muy corto")
    private String patient;

    @NotBlank(message = "El médico es obligatorio")
    private String doctor;

    @NotBlank(message = "Selecciona un servicio")
    private String service;

    @NotBlank(message = "Selecciona una fecha")
    private String date;

    @NotBlank(message = "Selecciona una hora")
    private String time;

    @NotBlank(message = "Selecciona la modalidad")
    private String mode;

    private String notes;

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPatient() { return patient; }
    public void setPatient(String patient) { this.patient = patient; }

    public String getDoctor() { return doctor; }
    public void setDoctor(String doctor) { this.doctor = doctor; }

    public String getService() { return service; }
    public void setService(String service) { this.service = service; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
