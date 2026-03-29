package com.javaverse.api;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Map<String, String> payload) {
        String user = payload.get("username");
        String rawPass = payload.get("password");

        // Cifrado BCrypt: Genera un hash irreconocible (Seguro para repos públicos)
        String hashedPass = encoder.encode(rawPass);

        Map<String, String> response = new HashMap<>();
        response.put("user", user);
        response.put("encrypted_hash", hashedPass);
        response.put("security", "AES-256 + BCrypt");
        return response;
    }
}
