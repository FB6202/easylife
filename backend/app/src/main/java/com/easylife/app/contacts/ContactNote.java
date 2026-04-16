package com.easylife.app.contacts;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "contact_notes")
class ContactNote {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String content;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "contact_id")
    private Contact contact;

}
