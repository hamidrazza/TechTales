package com.hamid.techtales.controller;

import com.hamid.techtales.model.dto.AuthResponseDTO;
import com.hamid.techtales.model.dto.LoginRequestDTO;
import com.hamid.techtales.model.dto.RegisterRequestDTO;
import com.hamid.techtales.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequestDTO requestDTO) {
        return ResponseEntity.ok(userService.register(requestDTO));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO requestDTO) {
        return ResponseEntity.ok(userService.login(requestDTO));
    }
}
