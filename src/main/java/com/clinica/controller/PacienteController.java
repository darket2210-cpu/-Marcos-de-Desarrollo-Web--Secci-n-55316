package com.clinica.controller;

import com.clinica.model.Cita;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Controller
@RequestMapping("/agenda")
public class PacienteController {

    // Lista en memoria (equivalente al array appointments de app.js)
    private static final List<Cita> appointments = new ArrayList<>();

    static {
        Cita c1 = new Cita();
        c1.setId(1L); c1.setPatient("Ana Torres"); c1.setDoctor("Dr. Ramírez");
        c1.setService("Cardiología"); c1.setDate("2026-04-12");
        c1.setTime("10:30"); c1.setMode("Presencial");
        c1.setNotes("Control por chequeo anual.");
        appointments.add(c1);

        Cita c2 = new Cita();
        c2.setId(2L); c2.setPatient("Luis Mendoza"); c2.setDoctor("Dra. Flores");
        c2.setService("Pediatría"); c2.setDate("2026-04-12");
        c2.setTime("15:00"); c2.setMode("Presencial");
        c2.setNotes("Seguimiento de alergias estacionales.");
        appointments.add(c2);

        Cita c3 = new Cita();
        c3.setId(3L); c3.setPatient("Carmen Paredes"); c3.setDoctor("Dr. Soto");
        c3.setService("Odontología"); c3.setDate("2026-04-13");
        c3.setTime("09:00"); c3.setMode("Teleconsulta");
        c3.setNotes("Evaluación previa a tratamiento.");
        appointments.add(c3);
    }

    // GET /agenda → muestra la agenda + formulario vacío
    @GetMapping
    public String verAgenda(Model model) {
        List<Cita> sorted = appointments.stream()
            .sorted(Comparator.comparing(c -> (c.getDate() + "T" + c.getTime())))
            .toList();
        model.addAttribute("appointments", sorted);
        model.addAttribute("cita", new Cita()); // objeto vacío para el form
        return "agenda";
    }

    // POST /agenda → registra nueva cita
    @PostMapping
    public String registrarCita(
            @Valid @ModelAttribute("cita") Cita cita,
            BindingResult result,
            Model model,
            RedirectAttributes redirectAttrs) {

        // Validación: horario duplicado (equivalente a scheduleTaken en app.js)
        boolean duplicado = appointments.stream().anyMatch(a ->
            a.getDate().equals(cita.getDate()) &&
            a.getTime().equals(cita.getTime()) &&
            a.getDoctor().equalsIgnoreCase(cita.getDoctor())
        );

        if (duplicado) {
            result.rejectValue("time", "duplicado",
                "Ese médico ya tiene una cita en esa fecha y hora.");
        }

        if (result.hasErrors()) {
            // Volver a cargar la lista para mostrar la página con errores
            model.addAttribute("appointments", appointments);
            return "agenda";
        }

        cita.setId(System.currentTimeMillis());
        if (cita.getNotes() == null || cita.getNotes().isBlank()) {
            cita.setNotes("Paciente sin observaciones adicionales.");
        }
        appointments.add(cita);

        redirectAttrs.addFlashAttribute("successMsg", "Cita registrada correctamente.");
        return "redirect:/agenda";
    }
}