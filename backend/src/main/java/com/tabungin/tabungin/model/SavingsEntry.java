package com.tabungin.tabungin.model;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavingsEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "goal_id")
    private SavingsGoal savingsGoal;

    private BigDecimal nominal;

    private LocalDate tanggal;
}
