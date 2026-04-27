package com.hamid.techtales.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record PostRequestDTO(
        String title,
        String content
) {}
