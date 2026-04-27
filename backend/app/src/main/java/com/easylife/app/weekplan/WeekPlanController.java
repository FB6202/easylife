package com.easylife.app.weekplan;

import com.easylife.app.shared.enums.WeekPlanStatus;
import com.easylife.app.shared.payload.PageResponse;
import com.easylife.app.weekplan.api.WeekPlanFilter;
import com.easylife.app.weekplan.api.WeekPlanRequest;
import com.easylife.app.weekplan.api.WeekPlanResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/weekplans")
@RequiredArgsConstructor
public class WeekPlanController {

    private final WeekPlanService weekPlanService;

    @PostMapping
    public ResponseEntity<WeekPlanResponse> create(
            @RequestBody @Valid WeekPlanRequest request,
            @RequestParam Long userId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(weekPlanService.create(request, userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WeekPlanResponse> findById(
            @PathVariable Long id,
            @RequestParam Long userId) {
        return ResponseEntity.ok(weekPlanService.findById(id, userId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<WeekPlanResponse>> findAll(
            @RequestParam Long userId,
            @ModelAttribute WeekPlanFilter filter,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(weekPlanService.findAll(userId, filter, page, size));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WeekPlanResponse> update(
            @PathVariable Long id,
            @RequestBody @Valid WeekPlanRequest request,
            @RequestParam Long userId) {
        return ResponseEntity.ok(weekPlanService.update(id, request, userId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<WeekPlanResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam WeekPlanStatus status,
            @RequestParam Long userId) {
        return ResponseEntity.ok(weekPlanService.updateStatus(id, status, userId));
    }

    @PatchMapping("/{id}/reflection")
    public ResponseEntity<WeekPlanResponse> addReflection(
            @PathVariable Long id,
            @RequestBody String reflection,
            @RequestParam Long userId) {
        return ResponseEntity.ok(weekPlanService.addReflection(id, reflection, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            @RequestParam Long userId) {
        weekPlanService.delete(id, userId);
        return ResponseEntity.noContent().build();
    }

}
