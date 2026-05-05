package com.hamid.techtales.model.dto;

import java.util.Set;

public record UserResponseDTO(
        Integer id,
        String username,
        String name,
        String email,
        Set<String> roles
) {}
