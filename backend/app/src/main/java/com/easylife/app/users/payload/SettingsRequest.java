package com.easylife.app.users.payload;

import jakarta.validation.constraints.NotBlank;

public record SettingsRequest(
        @NotBlank String language,
        @NotBlank String webColorTheme,
        @NotBlank String mobileColorTheme,
        Boolean emailNotifications,
        Boolean pushNotifications
) {}
