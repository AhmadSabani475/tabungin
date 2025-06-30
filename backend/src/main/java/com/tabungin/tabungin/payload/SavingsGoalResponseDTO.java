package com.tabungin.tabungin.payload;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SavingsGoalResponseDTO {
    private Long id;
    private String namaTabungan;
    private BigDecimal target;
    private BigDecimal nominalRutin;
    private String frekuensi;
    private List<String> hari;
    private String mataUang;
    private LocalDate tanggalDibuat;
    private BigDecimal nominalTerkumpul;
    private String status;
    private String gambar;
}
