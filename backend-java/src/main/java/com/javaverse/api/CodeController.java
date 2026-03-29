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
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("engine", "Java 21 OpenJDK");
        response.put("timestamp", System.currentTimeMillis());
        return response;
    }
}
