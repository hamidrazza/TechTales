package com.hamid.techtales.model.dto;


import com.hamid.techtales.model.User;

public record PostResponseDTO(
        String title,
        String content,
        AuthorResponseDTO author
) {}
