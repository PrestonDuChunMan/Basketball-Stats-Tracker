package com.bball.bball.Controller;

import com.bball.bball.Models.Players;
import com.bball.bball.Repo.PlayersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlayersApiControllers {

    @Autowired
    private PlayersRepo playersRepo;



    @GetMapping(value = "/players")
    public List<Players> getPlayers(){
        return playersRepo.findAll(); //return all players
    }

    @PostMapping(value = "/players/save")
    public String savePlayers(@RequestBody Players players){
        playersRepo.save(players);
        return "Saved player!";
    }

    @PutMapping(value = "/players/update/{id}")
    public String updatePlayers(@PathVariable int id, @RequestBody Players players) {
        Players updatedPlayer = playersRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Player not found with ID: " + id));

        // Update fields only if the new value is valid
        if (players.getName() != null && !players.getName().isEmpty()) {
            updatedPlayer.setName(players.getName());
        }
        if (players.getHeight() != 0) {
            updatedPlayer.setHeight(players.getHeight());
        }
        if (players.getWeight() != 0) {
            updatedPlayer.setWeight(players.getWeight());
        }
        if (players.getAge() != 0) {
            updatedPlayer.setAge(players.getAge());
        }
        if (players.getBirthdate() != null && !players.getBirthdate().isEmpty()) {
            updatedPlayer.setBirthdate(players.getBirthdate());
        }
        playersRepo.save(updatedPlayer);
        return "Updated player info.";
    }

    @DeleteMapping(value = "/players/delete/{id}")
    public String deletePlayer(@PathVariable int id){
        Players deletedPlayer = playersRepo.findById(id).get();
        playersRepo.delete(deletedPlayer);
        return "Delete player, ID: " +id;
    }
}
