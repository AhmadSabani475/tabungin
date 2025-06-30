package com.tabungin.tabungin.repository;

import com.tabungin.tabungin.model.SavingsGoal;
import com.tabungin.tabungin.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavingsGoalRepository extends JpaRepository<SavingsGoal, Long> {
    List<SavingsGoal> findByUser(User user);
}
