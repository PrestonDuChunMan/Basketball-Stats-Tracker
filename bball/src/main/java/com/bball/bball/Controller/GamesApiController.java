package com.bball.bball.Controller;

import com.bball.bball.Models.Games;
import com.bball.bball.Models.Players;
import com.bball.bball.Repo.GamesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GamesApiController {

    @Autowired
    private GamesRepo gamesRepo;



    @GetMapping(value = "/games")
    public List<Games> getGames() {
        return gamesRepo.findAll();
    }



    @PostMapping(value = "/games/save")
    public String saveGames(@RequestBody Games games){
        gamesRepo.save(games);
        return "Saved game!";
    }

    @PutMapping(value = "/games/update/{id}")
    public String updateGames(@PathVariable int id, @RequestBody Games games) {
        Games updatedGame = gamesRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found with ID: " + id));

        if(games.getScoreA() != 0) {
            updatedGame.setScoreA(games.getScoreA());
        }
        if(games.getScoreB() !=0) {
            updatedGame.setScoreB(games.getScoreB());
        }
        if (games.getDate() != null) {
            updatedGame.setDate(games.getDate());
        }
        if (games.getGameNumber() != null ) {
            updatedGame.setGameNumber(games.getGameNumber());
        }
        if (games.getTeamA() != null) {
            updatedGame.setTeamA(games.getTeamA());
        }
        if (games.getTeamB() != null) {
            updatedGame.setTeamB(games.getTeamB());
        }


        gamesRepo.save(updatedGame);
        return "Updated game!";
    }

    @DeleteMapping(value = "/games/delete/{id}")
    public String deleteGames(@PathVariable int id){
        Games deletedGame = gamesRepo.findById(id).get();
        gamesRepo.delete(deletedGame);
        return "Deleted game, ID: " +id;
    }



}
