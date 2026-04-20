package com.easylife.app.users.payload;

import java.time.LocalDateTime;

public record UserResponse(
        Long id,
        String keycloakId,
        String username,
        String email,
        Boolean locked,
        Boolean emailVerified,
        LocalDateTime createdAt,
        ProfileResponse profile,
        SettingsResponse settings
) {}
