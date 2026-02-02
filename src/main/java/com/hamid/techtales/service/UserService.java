package com.hamid.techtales.service;

import com.hamid.techtales.model.User;
import com.hamid.techtales.model.dto.UserResponseDTO;
import com.hamid.techtales.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public String register(User user){

        user.setUsername(user.getUsername().toLowerCase());
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRoles(Collections.singleton("USER"));

        User user1 = userRepo.save(user);

        return (user1 == null) ? "Failed, Try Again..." : "Successfully Registered";
    }

    public List<UserResponseDTO> getAllUsers() {
        return userRepo.findAll()
                .stream()
                .map(user -> new UserResponseDTO(
                        user.getUsername(),
                        user.getRoles()
                ))
                .toList();
    }
}
