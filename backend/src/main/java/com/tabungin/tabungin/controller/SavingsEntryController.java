package com.tabungin.tabungin.controller;

import com.tabungin.tabungin.model.SavingsEntry;
import com.tabungin.tabungin.model.SavingsGoal;
import com.tabungin.tabungin.payload.ApiResponse;
import com.tabungin.tabungin.payload.SavingsEntryResponseDTO;
import com.tabungin.tabungin.repository.SavingsEntryRepository;
import com.tabungin.tabungin.repository.SavingsGoalRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/goals/{goalId}/entries")
public class SavingsEntryController {

    private final SavingsEntryRepository entryRepo;
    private final SavingsGoalRepository goalRepo;

    public SavingsEntryController(SavingsEntryRepository entryRepo, SavingsGoalRepository goalRepo) {
        this.entryRepo = entryRepo;
        this.goalRepo = goalRepo;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, SavingsEntryResponseDTO>>> createEntry(
            @PathVariable Long goalId,
            @RequestBody SavingsEntry entry) {

        SavingsGoal goal = goalRepo.findById(goalId).orElseThrow();
        entry.setSavingsGoal(goal);
        entry.setTanggal(LocalDate.now());

        SavingsEntry savedEntry = entryRepo.save(entry);

        // Update goal progress
        BigDecimal baru = goal.getNominalTerkumpul().add(entry.getNominal());
        goal.setNominalTerkumpul(baru);
        if (baru.compareTo(goal.getTarget()) >= 0) {
            goal.setStatus("TERCAPAI");
        }
        goalRepo.save(goal);

        SavingsEntryResponseDTO dto = toDTO(savedEntry);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>("success", "created", Map.of("entry", dto)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, List<SavingsEntryResponseDTO>>>> getEntries(@PathVariable Long goalId) {
        List<SavingsEntry> entries = entryRepo.findBySavingsGoalId(goalId);

        List<SavingsEntryResponseDTO> dtos = entries.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(
                new ApiResponse<>("success", "ok", Map.of("entries", dtos))
        );
    }

    // ✅ Helper method untuk konversi ke DTO
    private SavingsEntryResponseDTO toDTO(SavingsEntry entry) {
        return SavingsEntryResponseDTO.builder()
                .id(entry.getId())
                .goalId(entry.getSavingsGoal().getId())
                .nominal(entry.getNominal())
                .tanggal(entry.getTanggal())
                .build();
    }
}
