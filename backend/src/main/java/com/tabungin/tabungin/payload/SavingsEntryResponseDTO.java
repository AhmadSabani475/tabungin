package com.tabungin.tabungin.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavingsEntryResponseDTO {
    private Long id;
    private Long goalId; // ✅ Pastikan ini ADA
    private BigDecimal nominal;
    private LocalDate tanggal;
}
