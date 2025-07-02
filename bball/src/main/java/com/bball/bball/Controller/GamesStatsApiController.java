package com.bball.bball.Controller;

import com.bball.bball.Models.Games;
import com.bball.bball.Models.GamesStats;
import com.bball.bball.Repo.GamesStatsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class GamesStatsApiController {
    @Autowired
    private GamesStatsRepo gamesStatsRepo;

    @GetMapping(value = "/games/stats")
    public List<GamesStats> getGamesStats(){
        return gamesStatsRepo.findAll();
    }

    @GetMapping(value = "/player/{playerId}/{playerName}")
    public List<GamesStats> getPlayerDetails(@PathVariable("playerId") int playerId,
                                                 @PathVariable("playerName") String playerName) {
        return gamesStatsRepo.findByPlayerId_IdAndPlayerId_Name(playerId, playerName);
    }

    @GetMapping(value = "/game/{gameId}/{gameDate}/{gameNumber}")
    public List<GamesStats> getGameDetails(@PathVariable("gameId") int gameId,
                                               @PathVariable("gameDate") String gameDate,
                                               @PathVariable("gameNumber") String gameNumber){
        System.out.println("gameId: " + gameId + ", gameDate: " + gameDate + ", gameNumber: " + gameNumber);
        return gamesStatsRepo.findByGameId_IdAndGameId_DateAndGameId_GameNumber(gameId, gameDate, gameNumber);
    }

    //Player Averages Calculate
    @GetMapping(value = "/player/{playerId}/averages")
    public Map<String, Double> getPlayerAverages(@PathVariable("playerId") int playerId){
        List<GamesStats> statsList = gamesStatsRepo.findByPlayerId_Id(playerId);
        double totalPoints =0;
        double totalFieldGoalMade=0;
        double totalFieldGoalAttempted=0;
        double totalThreePointerMade=0;
        double totalThreePointerAttempted=0;
        double totalFreeThrowMade=0;
        double totalFreeThrowAttempted=0;
        double totalRebounds=0;
        double totalAssists=0;
        double totalTurnovers=0;
        double totalSteals=0;
        double totalBlocks=0;

        for (GamesStats gameStats : statsList) {
            totalPoints += gameStats.getPoints();
            totalFieldGoalMade += gameStats.getFieldGoalMade();
            totalFieldGoalAttempted += gameStats.getFieldGoalAttempted();
            totalThreePointerMade += gameStats.getThreePointerMade();
            totalThreePointerAttempted += gameStats.getThreePointerAttempted();
            totalFreeThrowMade += gameStats.getFreeThrowMade();
            totalFreeThrowAttempted += gameStats.getFreeThrowAttempted();
            totalRebounds += gameStats.getRebounds();
            totalAssists += gameStats.getAssists();
            totalTurnovers += gameStats.getTurnover();
            totalSteals += gameStats.getSteal();
            totalBlocks += gameStats.getBlock();
        }
//        String totalFieldGoalPercentage = String.format("%.1f", (totalFieldGoalMade/ totalFieldGoalAttempted) *100);
        double gamesPlayed = statsList.size();
        Map<String, Double> averages = new LinkedHashMap<>();
        averages.put("GP", gamesPlayed);
        averages.put("TotalFGM", totalFieldGoalMade);
        averages.put("TotalFGA", totalFieldGoalAttempted);
        averages.put("TotalTPM", totalThreePointerMade);
        averages.put("TotalTPA", totalThreePointerAttempted);
        averages.put("TotalFTM", totalFreeThrowMade);
        averages.put("TotalFTA", totalFreeThrowAttempted);

        averages.put("PPG", gamesPlayed > 0 ? Math.round((totalPoints / (double) gamesPlayed) * 10) / 10.0 : 0);
        averages.put("FGM", gamesPlayed > 0 ? Math.round((totalFieldGoalMade / (double) gamesPlayed) * 10) / 10.0 : 0);
        averages.put("FGA", gamesPlayed > 0 ? Math.round((totalFieldGoalAttempted / (double) gamesPlayed) * 10) / 10.0 : 0);
        averages.put("TPM", gamesPlayed > 0 ? Math.round((totalThreePointerMade / (double) gamesPlayed) * 10) / 10.0 : 0);
        averages.put("TPA", gamesPlayed > 0 ? Math.round((totalThreePointerAttempted / (double) gamesPlayed) * 10) / 10.0 : 0);
        averages.put("FTM", gamesPlayed > 0 ? Math.round((totalFreeThrowMade / (double) gamesPlayed) * 10) / 10.0 : 0);
        averages.put("FTA", gamesPlayed > 0 ? Math.round((totalFreeThrowAttempted / (double) gamesPlayed) * 10) / 10.0 : 0);
        averages.put("RPG", gamesPlayed > 0 ? Math.round((totalRebounds / (double) gamesPlayed) * 10) / 10.0 : 0);
        averages.put("APG", gamesPlayed > 0 ? Math.round((totalAssists / (double) gamesPlayed) * 10) / 10.0 : 0);
        averages.put("TOV", gamesPlayed > 0 ? Math.round((totalTurnovers / (double) gamesPlayed) * 10) / 10.0 : 0);
        averages.put("STL", gamesPlayed > 0 ? Math.round((totalSteals / (double) gamesPlayed) * 10) / 10.0 : 0);
        averages.put("BLK", gamesPlayed > 0 ? Math.round((totalBlocks / (double) gamesPlayed) * 10) / 10.0 : 0);

        return averages;



    }

//    NOTE: Need to send more than one object!!! DO NOT SET THE ID FOR GAMES STATS
    @PostMapping(value = "/games/stats/save")
    public String saveGames(@RequestBody List<GamesStats> gamesStatsList) {
        for(GamesStats gamesStats: gamesStatsList)
            gamesStatsRepo.save(gamesStats);
        return "Saved all players' game stats!";
    }

    @PutMapping(value = "/games/stats/update/{id}")
    public String updateGameStats(@PathVariable int id, @RequestBody GamesStats gameStats) {
        // Retrieve the existing game stats by ID
        GamesStats updatedStats = gamesStatsRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Game stats not found with ID: " + id));

            updatedStats.setPlayerId(gameStats.getPlayerId());
            updatedStats.setGameId(gameStats.getGameId());
            updatedStats.setBelongedTeam(gameStats.getBelongedTeam());
            updatedStats.setPoints(gameStats.getPoints());
            updatedStats.setFieldGoalMade(gameStats.getFieldGoalMade());
            updatedStats.setFieldGoalAttempted(gameStats.getFieldGoalAttempted());
            updatedStats.setThreePointerMade(gameStats.getThreePointerMade());
            updatedStats.setThreePointerAttempted(gameStats.getThreePointerAttempted());
            updatedStats.setFreeThrowMade(gameStats.getFreeThrowMade());
            updatedStats.setFreeThrowAttempted(gameStats.getFreeThrowAttempted());
            updatedStats.setRebounds(gameStats.getRebounds());
            updatedStats.setAssists(gameStats.getAssists());
            updatedStats.setSteal(gameStats.getSteal());
            updatedStats.setBlock(gameStats.getBlock());
            updatedStats.setTurnover(gameStats.getTurnover());

        gamesStatsRepo.save(updatedStats);
        return "Updated game stats!";
    }


    @DeleteMapping(value = "/games/stats/delete/{id}")
    public String deleteGames(@PathVariable int id){
        GamesStats deletedGamesStats = gamesStatsRepo.findById(id).get();
        gamesStatsRepo.delete(deletedGamesStats);
        return "Deleted game stats, ID: " +id;
    }
}
