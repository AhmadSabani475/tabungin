package com.tabungin.tabungin.controller;

import com.tabungin.tabungin.model.SavingsGoal;
import com.tabungin.tabungin.model.User;
import com.tabungin.tabungin.payload.ApiResponse;
import com.tabungin.tabungin.payload.SavingsGoalResponseDTO;
import com.tabungin.tabungin.repository.SavingsEntryRepository;
import com.tabungin.tabungin.repository.SavingsGoalRepository;
import com.tabungin.tabungin.repository.UserRepository;
import com.tabungin.tabungin.service.FileStorageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/goals")
public class SavingsGoalController {

    private final SavingsGoalRepository repo;
    private final UserRepository userRepo;
    private final SavingsEntryRepository savingsEntryRepo;
    private final FileStorageService fileStorageService;

    public SavingsGoalController(SavingsGoalRepository repo,
                                 UserRepository userRepo,
                                 SavingsEntryRepository savingsEntryRepo,
                                 FileStorageService fileStorageService) {
        this.repo = repo;
        this.userRepo = userRepo;
        this.savingsEntryRepo = savingsEntryRepo;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<List<SavingsGoalResponseDTO>>> getAllGoals(Authentication auth) {
        String email = auth.getName();
        User user = userRepo.findByEmail(email).orElseThrow();

        List<SavingsGoalResponseDTO> goalDTOs = repo.findByUser(user).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(
                new ApiResponse<>("success", "Data berhasil diambil", goalDTOs)
        );
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Transactional
    public ResponseEntity<ApiResponse<SavingsGoalResponseDTO>> createGoal(
            @RequestPart String namaTabungan,
            @RequestPart String target,
            @RequestPart String nominalRutin,
            @RequestPart String frekuensi,
            @RequestPart(required = false) String hari,
            @RequestPart String mataUang,
            @RequestPart String tanggalDibuat,
            @RequestPart(required = false) MultipartFile gambar,
            Authentication auth) throws IOException {

        LocalDate tanggal = LocalDate.parse(tanggalDibuat);
        List<String> hariList = hari != null ? List.of(hari.split(",")) : null;

        if (gambar != null && !gambar.isEmpty()) {
            validateImageFile(gambar);
        }

        SavingsGoal goal = new SavingsGoal();
        goal.setNamaTabungan(namaTabungan);
        goal.setTarget(new BigDecimal(target));
        goal.setNominalRutin(new BigDecimal(nominalRutin));
        goal.setFrekuensi(frekuensi);
        goal.setHari(hariList);
        goal.setMataUang(mataUang);
        goal.setTanggalDibuat(tanggal);
        goal.setUser(userRepo.findByEmail(auth.getName()).orElseThrow());
        goal.setNominalTerkumpul(BigDecimal.ZERO);
        goal.setStatus("berlangsung");

        if (gambar != null && !gambar.isEmpty()) {
            goal.setGambar(fileStorageService.storeFile(gambar));
        }

        SavingsGoal savedGoal = repo.save(goal);
        return ResponseEntity.status(201)
                .body(new ApiResponse<>("success", "Goal berhasil dibuat", convertToDto(savedGoal)));
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<SavingsGoalResponseDTO>> getGoal(
            @PathVariable Long id,
            Authentication auth) {

        SavingsGoal goal = validateAndGetGoal(id, auth);
        return ResponseEntity.ok(
                new ApiResponse<>("success", "Data berhasil diambil", convertToDto(goal))
        );
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<ApiResponse<String>> deleteGoal(
            @PathVariable Long id,
            Authentication auth) {

        SavingsGoal goal = validateAndGetGoal(id, auth);
        savingsEntryRepo.deleteBySavingsGoalId(id);
        repo.delete(goal);

        return ResponseEntity.ok(
                new ApiResponse<>("success", "Goal berhasil dihapus", null)
        );
    }
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Transactional
    public ResponseEntity<ApiResponse<SavingsGoalResponseDTO>> updateGoal(
            @PathVariable Long id,
            @RequestPart String namaTabungan,
            @RequestPart String target,
            @RequestPart String nominalRutin,
            @RequestPart String frekuensi,
            @RequestPart(required = false) String hari,
            @RequestPart String mataUang,
            @RequestPart String tanggalDibuat,
            @RequestPart(required = false) MultipartFile gambar,
            Authentication auth) throws IOException {

        SavingsGoal goal = validateAndGetGoal(id, auth);

        goal.setNamaTabungan(namaTabungan);
        goal.setTarget(new BigDecimal(target));
        goal.setNominalRutin(new BigDecimal(nominalRutin));
        goal.setFrekuensi(frekuensi);
        goal.setHari(hari != null ? List.of(hari.split(",")) : null);
        goal.setMataUang(mataUang);
        goal.setTanggalDibuat(LocalDate.parse(tanggalDibuat));

        if (gambar != null && !gambar.isEmpty()) {
            validateImageFile(gambar);
            goal.setGambar(fileStorageService.storeFile(gambar));
        }

        SavingsGoal updatedGoal = repo.save(goal);
        return ResponseEntity.ok(
                new ApiResponse<>("success", "Goal berhasil diperbarui", convertToDto(updatedGoal))
        );
    }

    private SavingsGoal validateAndGetGoal(Long id, Authentication auth) {
        String email = auth.getName();
        User user = userRepo.findByEmail(email).orElseThrow();

        SavingsGoal goal = repo.findById(id).orElseThrow();
        if (!goal.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Akses ditolak untuk goal ini");
        }
        return goal;
    }

    private void validateImageFile(MultipartFile file) {
        if (!file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("File harus berupa gambar");
        }
        if (file.getSize() > 2 * 1024 * 1024) {
            throw new IllegalArgumentException("Ukuran gambar maksimal 2MB");
        }
    }

    private SavingsGoalResponseDTO convertToDto(SavingsGoal goal) {
        return SavingsGoalResponseDTO.builder()
                .id(goal.getId())
                .namaTabungan(goal.getNamaTabungan())
                .target(goal.getTarget())
                .nominalRutin(goal.getNominalRutin())
                .frekuensi(goal.getFrekuensi())
                .hari(goal.getHari())
                .mataUang(goal.getMataUang())
                .tanggalDibuat(goal.getTanggalDibuat())
                .nominalTerkumpul(goal.getNominalTerkumpul())
                .status(goal.getStatus())
                .gambar(goal.getGambar())
                .build();
    }
}