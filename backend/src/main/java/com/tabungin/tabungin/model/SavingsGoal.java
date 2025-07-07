package com.tabungin.tabungin.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavingsGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String namaTabungan;
    private BigDecimal target;
    private BigDecimal nominalRutin;
    private String frekuensi;

    @ElementCollection
    private List<String> hari;

    private String mataUang;
    private LocalDate tanggalDibuat;
    private BigDecimal nominalTerkumpul = BigDecimal.ZERO;
    private String status = "BERLANGSUNG";
    private String gambar;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}