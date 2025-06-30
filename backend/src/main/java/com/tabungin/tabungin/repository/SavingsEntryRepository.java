package com.tabungin.tabungin.repository;

import com.tabungin.tabungin.model.SavingsEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavingsEntryRepository extends JpaRepository<SavingsEntry, Long> {
    List<SavingsEntry> findBySavingsGoalId(Long goalId);
}
