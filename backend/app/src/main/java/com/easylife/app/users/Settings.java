package com.easylife.app.users;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "settings")
class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String language;
    @Column(nullable = false)
    private String webColorTheme;
    @Column(nullable = false)
    private String mobileColorTheme;
    @Column(nullable = false)
    private Boolean emailNotifications;
    @Column(nullable = false)
    private Boolean pushNotifications;

}
