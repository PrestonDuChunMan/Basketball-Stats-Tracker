package com.bball.bball.Repo;

import com.bball.bball.Models.Players;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayersRepo extends JpaRepository<Players, Integer> {
}
