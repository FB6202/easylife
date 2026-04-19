package com.easylife.app.documents;

import com.easylife.app.shared.enums.AccessType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findAllByUserId(Long userId);

    List<Document> findAllByUserIdAndFileType(Long userId, String fileType);

    List<Document> findAllByUserIdAndAccessType(Long userId, AccessType accessType);

    List<Document> findAllByUserIdOrderByUploadedAtDesc(Long userId);

    Optional<Document> findByIdAndUserId(Long id, Long userId);

}
