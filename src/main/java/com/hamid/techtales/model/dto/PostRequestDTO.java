package com.hamid.techtales.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record PostRequestDTO(
        @NotBlank(message = "Title must not be empty")
        String title,
        @Min(value = 5, message = "Content is too small...")
        String content
) {}
