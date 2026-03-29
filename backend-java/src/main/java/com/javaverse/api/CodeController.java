package com.javaverse.api;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class CodeController {

    @PostMapping("/run")
    public Map<String, Object> executeCode(@RequestBody Map<String, String> payload) {
        System.out.println("[JAVA SERVER] Procesando petición...");
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("engine", "OpenJDK 21 + Spring Boot");
        response.put("output", "Código Java ejecutado correctamente.");
        return response;
    }
}
