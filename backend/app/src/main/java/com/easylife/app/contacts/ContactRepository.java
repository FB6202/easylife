package com.easylife.app.contacts;

import com.easylife.app.shared.enums.RelationshipType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

interface ContactRepository extends JpaRepository<Contact, Long> {

    List<Contact> findAllByUserId(Long userId);

    List<Contact> findAllByUserIdAndRelationshipType(Long userId, RelationshipType relationshipType);

    List<Contact> findAllByUserIdOrderByLastnameAsc(Long userId);

    Optional<Contact> findByIdAndUserId(Long id, Long userId);

    List<Contact> findAllByUserIdAndCompany(Long userId, String company);

}
