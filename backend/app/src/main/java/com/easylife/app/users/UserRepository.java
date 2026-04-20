package com.easylife.app.users;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    Optional<User> findByKeycloakId(String keycloakId);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

}
