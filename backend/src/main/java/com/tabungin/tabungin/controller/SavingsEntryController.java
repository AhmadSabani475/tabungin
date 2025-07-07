package com.tabungin.tabungin.controller;

import com.tabungin.tabungin.model.SavingsEntry;
import com.tabungin.tabungin.model.SavingsGoal;
import com.tabungin.tabungin.payload.ApiResponse;
import com.tabungin.tabungin.payload.SavingsEntryRequest;
import com.tabungin.tabungin.payload.SavingsEntryResponseDTO;
import com.tabungin.tabungin.repository.SavingsEntryRepository;
import com.tabungin.tabungin.repository.SavingsGoalRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
            @RequestBody SavingsEntryRequest request) {

        SavingsGoal goal = goalRepo.findById(goalId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Goal tidak ditemukan"));

        if (request.getNominal() == null || request.getNominal().compareTo(BigDecimal.ZERO) == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nominal tidak boleh nol");
        }

        // Validasi jenis transaksi dari input
        String jenisTransaksi = request.getJenisTransaksi();
        if (jenisTransaksi == null || (!jenisTransaksi.equalsIgnoreCase("TAMBAH") && !jenisTransaksi.equalsIgnoreCase("KURANG"))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Jenis transaksi harus TAMBAH atau KURANG");
        }
        jenisTransaksi = jenisTransaksi.toUpperCase();


        BigDecimal nominalFinal = jenisTransaksi.equals("KURANG") ? request.getNominal().negate() : request.getNominal();


        BigDecimal saldoBaru = goal.getNominalTerkumpul().add(nominalFinal);
        if (saldoBaru.compareTo(BigDecimal.ZERO) < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Saldo tidak cukup untuk pengurangan");
        }


        SavingsEntry entry = SavingsEntry.builder()
                .savingsGoal(goal)
                .nominal(nominalFinal)
                .tanggal(request.getTanggal() != null ? request.getTanggal() : LocalDate.now())
                .keterangan(request.getKeterangan())
                .jenisTransaksi(jenisTransaksi)
                .build();

        SavingsEntry savedEntry = entryRepo.save(entry);

        goal.setNominalTerkumpul(saldoBaru);
        if (saldoBaru.compareTo(goal.getTarget()) >= 0) {
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

    private SavingsEntryResponseDTO toDTO(SavingsEntry entry) {
        return SavingsEntryResponseDTO.builder()
                .id(entry.getId())
                .goalId(entry.getSavingsGoal().getId())
                .nominal(entry.getNominal())
                .jenisTransaksi(entry.getJenisTransaksi())
                .keterangan(entry.getKeterangan())
                .tanggal(entry.getTanggal())
                .build();
    }
}
