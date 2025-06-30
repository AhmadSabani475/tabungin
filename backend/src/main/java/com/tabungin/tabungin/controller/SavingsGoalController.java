package com.tabungin.tabungin.controller;

import com.tabungin.tabungin.model.SavingsGoal;
import com.tabungin.tabungin.model.User;
import com.tabungin.tabungin.payload.ApiResponse;
import com.tabungin.tabungin.payload.SavingsGoalResponseDTO;
import com.tabungin.tabungin.repository.SavingsGoalRepository;
import com.tabungin.tabungin.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/goals")
public class SavingsGoalController {

    private final SavingsGoalRepository repo;
    private final UserRepository userRepo;
    public SavingsGoalController(SavingsGoalRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, List<SavingsGoalResponseDTO>>>> getAllGoals(Authentication auth) {
//        List<SavingsGoal> goals = repo.findAll();
        String email = auth.getName(); // dari token JWT
        User user = userRepo.findByEmail(email).orElseThrow();
        List<SavingsGoal> goals = repo.findByUser(user);
        List<SavingsGoalResponseDTO> goalDTOs = goals.stream()
                .map(goal -> SavingsGoalResponseDTO.builder()
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
                        .build())
                .collect(Collectors.toList());

        ApiResponse<Map<String, List<SavingsGoalResponseDTO>>> response = ApiResponse.<Map<String, List<SavingsGoalResponseDTO>>>builder()
                .status("success")
                .message("ok")
                .data(Map.of("goals", goalDTOs))
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Map<String, SavingsGoalResponseDTO>>> createGoal(@RequestBody SavingsGoal goal, Authentication auth) {
        String email = auth.getName();
        User user = userRepo.findByEmail(email).orElseThrow();
        goal.setUser(user); // relasikan goal dengan user

        SavingsGoal savedGoal = repo.save(goal);
        SavingsGoalResponseDTO dto = SavingsGoalResponseDTO.builder()
                .id(savedGoal.getId())
                .namaTabungan(savedGoal.getNamaTabungan())
                .target(savedGoal.getTarget())
                .nominalRutin(savedGoal.getNominalRutin())
                .frekuensi(savedGoal.getFrekuensi())
                .hari(savedGoal.getHari())
                .mataUang(savedGoal.getMataUang())
                .tanggalDibuat(savedGoal.getTanggalDibuat())
                .nominalTerkumpul(savedGoal.getNominalTerkumpul())
                .status(savedGoal.getStatus())
                .gambar(savedGoal.getGambar())
                .build();

        return ResponseEntity
                .status(201) // CREATED
                .body(new ApiResponse<>("success", "created", Map.of("goal", dto)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Map<String, SavingsGoalResponseDTO>>> getGoal(@PathVariable Long id, Authentication auth) {
        String email = auth.getName();
        User user = userRepo.findByEmail(email).orElseThrow();

        SavingsGoal goal = repo.findById(id).orElseThrow();
        if (!goal.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build(); // Forbidden
        }

        SavingsGoalResponseDTO dto = SavingsGoalResponseDTO.builder()
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

        return ResponseEntity.ok(new ApiResponse<>("success", "ok", Map.of("goal", dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteGoal(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.ok(new ApiResponse<>("success", "deleted", null));
    }

}
