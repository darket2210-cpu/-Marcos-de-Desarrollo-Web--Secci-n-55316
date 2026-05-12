package com.clinica.model;

import jakarta.validation.constraints.*;

public class Usuario {
	  @NotBlank(message = "El nombre es obligatorio")
	    @Size(min = 3, message = "Nombre muy corto")
	    private String name;

	    @NotBlank(message = "El DNI es obligatorio")
	    @Pattern(regexp = "\\d{8}", message = "El DNI debe tener exactamente 8 dígitos")
	    private String dni;

	    @NotBlank(message = "El correo es obligatorio")
	    @Email(message = "Correo inválido")
	    private String email;

	    @NotBlank(message = "El teléfono es obligatorio")
	    @Pattern(regexp = "\\d{9}", message = "El teléfono debe tener 9 dígitos")
	    private String phone;

	    @NotBlank(message = "La contraseña es obligatoria")
	    @Size(min = 6, message = "Mínimo 6 caracteres")
	    private String password;

	    // Getters y setters
	    public String getName() { return name; }
	    public void setName(String name) { this.name = name; }

	    public String getDni() { return dni; }
	    public void setDni(String dni) { this.dni = dni; }

	    public String getEmail() { return email; }
	    public void setEmail(String email) { this.email = email; }

	    public String getPhone() { return phone; }
	    public void setPhone(String phone) { this.phone = phone; }

	    public String getPassword() { return password; }
	    public void setPassword(String password) { this.password = password; }
}
