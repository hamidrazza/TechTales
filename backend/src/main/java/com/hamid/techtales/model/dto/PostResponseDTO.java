package com.hamid.techtales.model.dto;

import java.time.LocalDateTime;

public record PostResponseDTO(
        Integer id,
        String title,
        String content,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String author
) {}