package com.easylife.app.users;

import com.easylife.app.shared.enums.ColorTheme;
import com.easylife.app.shared.enums.Language;
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
    @Enumerated(EnumType.STRING)
    private Language language;
    @Enumerated(EnumType.STRING)
    private ColorTheme webColorTheme;
    @Enumerated(EnumType.STRING)
    private ColorTheme mobileColorTheme;
    @Column(nullable = false)
    private Boolean emailNotifications;
    @Column(nullable = false)
    private Boolean pushNotifications;

}
