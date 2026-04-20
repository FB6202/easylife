package com.easylife.app.users;

import com.easylife.app.users.payload.*;

public interface UserService {

    UserResponse register(RegisterUserRequest request);

    UserResponse findByKeycloakId(String keycloakId);

    UserResponse findById(Long id);

    ProfileResponse updateProfile(Long userId, ProfileRequest request);

    AddressResponse updateAddress(Long userId, AddressRequest request);

    SettingsResponse updateSettings(Long userId, SettingsRequest request);

    void updateProfileImage(Long userId, String profileImagePath);

}
