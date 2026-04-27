package com.hamid.techtales.model.dto;

public record PostResponseDTO(
        Integer id,
        String title,
        String content,
        String author
) {}