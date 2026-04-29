package com.hamid.techtales.controller;

import com.hamid.techtales.model.User;
import com.hamid.techtales.model.dto.UserResponseDTO;
import com.hamid.techtales.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    public UserController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/auth/signup")
    public String register(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping("/auth/login")
    public String login(@RequestBody User user){
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        return authentication.isAuthenticated() ? "LOGIN CONFIRMED..." : "LOGIN FAILED...";
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDTO>> getUsers(){
        return userService.getAllUsers();
    }
}
