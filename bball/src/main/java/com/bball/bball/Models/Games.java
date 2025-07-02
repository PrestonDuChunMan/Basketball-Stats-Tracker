package com.bball.bball.Models;

import jakarta.persistence.*;

@Entity
@Table(name="games" ,schema = "crudplayers")
public class Games {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String date;
    @Column
    private String gameNumber;
    @Column
    private String teamA;
    @Column
    private String teamB;
    @Column
    private int scoreA;
    @Column
    private int scoreB;

    public Games() {};

    public Games(int id, String date, String gameNumber, String teamA, String teamB, int scoreA, int scoreB) {
        this.id = id;
        this.date = date;
        this.gameNumber = gameNumber;
        this.teamA = teamA;
        this.teamB = teamB;
        this.scoreA = scoreA;
        this.scoreB = scoreB;
    }

    public void setGameNumber(String gameNumber){
        this.gameNumber = gameNumber;
    }

    public String getGameNumber(){
        return gameNumber;
    }

    public void setId(int id){
        this.id =id;
    }
    public int getId(){
        return id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTeamA() {
        return teamA;
    }

    public void setTeamA(String teamA) {
        this.teamA = teamA;
    }

    public String getTeamB() {
        return teamB;
    }

    public void setTeamB(String teamB) {
        this.teamB = teamB;
    }

    public int getScoreA() {
        return scoreA;
    }

    public void setScoreA(int scoreA) {
        this.scoreA = scoreA;
    }

    public int getScoreB() {
        return scoreB;
    }

    public void setScoreB(int scoreB) {
        this.scoreB = scoreB;
    }
}
