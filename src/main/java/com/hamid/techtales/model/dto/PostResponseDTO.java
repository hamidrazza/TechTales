package com.hamid.techtales.model.dto;

public record PostResponseDTO(
        String title,
        String content,
        AuthorResponseDTO author
) {}