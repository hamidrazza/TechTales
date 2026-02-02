package com.hamid.techtales.model.dto;

import java.util.Set;

public record UserResponseDTO(
        String username,
        Set<String> roles
) {
}
