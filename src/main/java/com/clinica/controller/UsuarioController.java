package com.clinica.controller;

import com.clinica.model.Usuario;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class UsuarioController {

    // GET / → página de inicio
    @GetMapping("/")
    public String inicio() {
        return "index";
    }

    // GET /acceso → muestra formularios login/registro
    @GetMapping("/acceso")
    public String mostrarAcceso(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "acceso";
    }

    // POST /registro → procesa el registro
    @PostMapping("/registro")
    public String registrar(
            @Valid @ModelAttribute("usuario") Usuario usuario,
            BindingResult result,
            Model model,
            RedirectAttributes redirectAttrs) {

        if (result.hasErrors()) {
            return "acceso"; // vuelve al form con errores
        }

        // Simulación: en un proyecto real aquí guardarías en BD
        redirectAttrs.addFlashAttribute("successMsg",
            "Registro exitoso. Ya puedes iniciar sesión.");
        return "redirect:/acceso";
    }

    // POST /login → procesa el login
    @PostMapping("/login")
    public String login(
            @RequestParam String email,
            @RequestParam String password,
            RedirectAttributes redirectAttrs) {

        // Simulación básica (sin BD real)
        if (email.contains("@") && password.length() >= 6) {
            redirectAttrs.addFlashAttribute("successMsg", "Sesión iniciada correctamente.");
            return "redirect:/agenda";
        }

        redirectAttrs.addFlashAttribute("errorMsg", "Credenciales inválidas.");
        return "redirect:/acceso";
    }
}
