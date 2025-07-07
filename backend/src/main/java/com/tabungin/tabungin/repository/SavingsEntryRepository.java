package com.tabungin.tabungin.repository;

import com.tabungin.tabungin.model.SavingsEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface SavingsEntryRepository extends JpaRepository<SavingsEntry, Long> {
    List<SavingsEntry> findBySavingsGoalId(Long goalId);

    @Modifying
    @Transactional
    @Query("DELETE FROM SavingsEntry e WHERE e.savingsGoal.id = :goalId")
    void deleteBySavingsGoalId(@Param("goalId") Long goalId);
}
