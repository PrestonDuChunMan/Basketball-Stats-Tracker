package com.bball.bball.Repo;

import com.bball.bball.Models.GamesStats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GamesStatsRepo extends JpaRepository<GamesStats, Integer> {

    List<GamesStats> findByPlayerId_IdAndPlayerId_Name(int playerId, String playerName);

    List<GamesStats> findByGameId_IdAndGameId_DateAndGameId_GameNumber(int gameId, String gameDate, String gameNumber);

    List<GamesStats> findByPlayerId_Id(int playerId);
}

