package com.hamid.techtales.service;

import com.hamid.techtales.model.User;
import com.hamid.techtales.model.dto.UserResponseDTO;
import com.hamid.techtales.repo.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Transactional
    public String register(User user) {
        String normalizedUsername = user.getUsername().trim().toLowerCase();

        if (userRepo.existsByUsername(normalizedUsername)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }

        user.setUsername(normalizedUsername);
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRoles(Collections.singleton("USER"));

        User user1 = userRepo.save(user);

        return (user1 == null) ? "Failed, Try Again..." : "Successfully Registered";
    }

    @Transactional(readOnly = true)
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> userResponses = userRepo.findAll().stream()
                .sorted((a, b) -> a.getUsername().compareToIgnoreCase(b.getUsername()))
                .map(user -> new UserResponseDTO(
                        user.getUsername(),
                        user.getRoles()
                ))
                .toList();

        return new ResponseEntity<>(userResponses, HttpStatus.OK);
    }
}
