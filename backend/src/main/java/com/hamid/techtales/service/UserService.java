package com.hamid.techtales.service;

import com.hamid.techtales.model.Post;
import com.hamid.techtales.model.User;
import com.hamid.techtales.model.dto.*;
import com.hamid.techtales.repo.UserRepo;
import com.hamid.techtales.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Transactional
    public String register(RegisterRequestDTO requestDTO) {
        String normalizedUsername = normalizeUsername(requestDTO.username());
        String normalizedEmail = normalizeEmail(requestDTO.email());

        if (userRepo.existsByUsername(normalizedUsername)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }

        if (normalizedEmail != null && userRepo.existsByEmail(normalizedEmail)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        User user = new User();
        user.setUsername(normalizedUsername);
        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(requestDTO.password()));
        user.setRoles(Collections.singleton("USER"));

        User user1 = userRepo.save(user);

        return (user1 == null) ? "Failed, Try Again..." : "Successfully Registered";
    }

    public AuthResponseDTO login(LoginRequestDTO requestDTO) {
        String normalizedUsername = normalizeUsername(requestDTO.username());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(normalizedUsername, requestDTO.password())
        );

        if (!authentication.isAuthenticated()) {
            throw new BadCredentialsException("Invalid username or password");
        }

        User user = userRepo.findByUsernameIgnoreCase(normalizedUsername)
                .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

        String token = jwtService.generateToken(authentication);
        AuthResponseDTO.UserDTO userDTO = new AuthResponseDTO.UserDTO(
                user.getId(),
                user.getUsername(),
                user.getName(),
                user.getEmail(),
                user.getRoles()
        );

        return new AuthResponseDTO(token, userDTO);
    }

    @Transactional(readOnly = true)
    public List<UserResponseDTO> getAllUsers() {
        return userRepo.findAllByOrderByUsernameAsc().stream()
                .map(this::toUserResponse)
                .toList();
    }

    public boolean isUsernameAvailable(String username) {
        return !userRepo.existsByUsername(normalizeUsername(username));
    }

    private String normalizeUsername(String username) {
        return username == null ? "" : username.trim().toLowerCase();
    }

    private String normalizeEmail(String email) {
        if (email == null || email.isBlank()) {
            return null;
        }
        return email.trim().toLowerCase();
    }

    private UserResponseDTO toUserResponse(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getName(),
                user.getEmail(),
                user.getRoles()
        );
    }
}
