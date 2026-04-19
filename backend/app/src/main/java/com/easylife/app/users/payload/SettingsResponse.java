package com.easylife.app.users.payload;

public record SettingsResponse(
        Long id,
        String language,
        String webColorTheme,
        String mobileColorTheme,
        Boolean emailNotifications,
        Boolean pushNotifications
) {}
