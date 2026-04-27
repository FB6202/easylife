package com.easylife.app.journal;

import com.easylife.app.journal.api.JournalEntryRequest;
import com.easylife.app.journal.api.JournalEntryResponse;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Component
class JournalEntryMapper {

    public JournalEntryResponse toResponse(JournalEntry entry) {
        return new JournalEntryResponse(
                entry.getId(),
                entry.getTitle(),
                entry.getMood(),
                entry.getWentWell(),
                entry.getWentBad(),
                entry.getLearnings(),
                entry.getGratitude(),
                entry.getEntryDate(),
                entry.getCreatedAt(),
                entry.getUpdatedAt(),
                entry.getCategoryIds()
        );
    }

    public JournalEntry toEntity(JournalEntryRequest request, Long userId) {
        return JournalEntry.builder()
                .title(request.title())
                .mood(request.mood())
                .wentWell(request.wentWell())
                .wentBad(request.wentBad())
                .learnings(request.learnings())
                .gratitude(request.gratitude())
                .entryDate(request.entryDate())
                .createdAt(LocalDateTime.now())
                .userId(userId)
                .categoryIds(request.categoryIds() != null ? request.categoryIds() : new ArrayList<>())
                .build();
    }

    public void update(JournalEntry entry, JournalEntryRequest request) {
        entry.setTitle(request.title());
        entry.setMood(request.mood());
        entry.setWentWell(request.wentWell());
        entry.setWentBad(request.wentBad());
        entry.setLearnings(request.learnings());
        entry.setGratitude(request.gratitude());
        entry.setEntryDate(request.entryDate());
        entry.setCategoryIds(request.categoryIds() != null ? request.categoryIds() : new ArrayList<>());
    }

}
