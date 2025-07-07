package com.tabungin.tabungin.payload;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import jakarta.validation.constraints.*;

@Data
public class SavingsEntryRequest {

    @NotNull(message = "Nominal tidak boleh kosong")
    @DecimalMin(value = "1", message = "Nominal minimal 1", inclusive = false)
    @DecimalMax(value = "1000000000", message = "Nominal maksimal 1.000.000.000")
    private BigDecimal nominal;

    @PastOrPresent(message = "Tanggal tidak boleh di masa depan")
    private LocalDate tanggal;

    @Size(max = 100, message = "Keterangan maksimal 100 karakter")
    private String keterangan;

    @NotBlank(message = "Jenis transaksi wajib diisi (TAMBAH atau KURANG)")
    private String jenisTransaksi;
}
