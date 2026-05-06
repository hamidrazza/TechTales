package com.hamid.techtales.model.dto;

import java.util.Set;

public record AuthResponseDTO(
        String accessToken,
        UserDTO user
) {
    public record UserDTO(
            Integer id,
            String username,
            String name,
            String email,
            Set<String> roles
    ) {
    }
}
