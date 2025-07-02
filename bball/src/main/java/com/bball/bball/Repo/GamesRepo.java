package com.bball.bball.Repo;

import com.bball.bball.Models.Games;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GamesRepo extends JpaRepository<Games, Integer> {
}
