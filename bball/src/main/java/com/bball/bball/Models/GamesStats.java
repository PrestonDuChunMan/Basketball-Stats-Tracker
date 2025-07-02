package com.bball.bball.Models;

import jakarta.persistence.*;

@Entity
@Table(name="games_stats" ,schema = "crudplayers")
public class GamesStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "playerId", referencedColumnName = "id", nullable = false)
    private Players playerId;

    @ManyToOne
    @JoinColumn(name = "gameId", referencedColumnName = "id", nullable = false)
    private Games gameId;
    @Column
    private String belongedTeam;
    @Column
    private int points;
    @Column
    private int fieldGoalMade;
    @Column
    private int fieldGoalAttempted;
    @Column
    private int threePointerMade;
    @Column
    private int threePointerAttempted;
    @Column
    private int freeThrowMade;
    @Column
    private int freeThrowAttempted;
    @Column
    private int rebounds;
    @Column
    private int assists;
    @Column
    private int steal;
    @Column
    private int block;
    @Column
    private int turnover;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Players getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Players playerId) {
        this.playerId = playerId;
    }

    public String getBelongedTeam(){
        return belongedTeam;
    }

    public void setBelongedTeam(String belongedTeam){
        this.belongedTeam = belongedTeam;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public Games getGameId() {
        return gameId;
    }

    public void setGameId(Games gameId) {
        this.gameId = gameId;
    }

    public int getFieldGoalMade() {
        return fieldGoalMade;
    }

    public void setFieldGoalMade(int fieldGoalMade) {
        this.fieldGoalMade = fieldGoalMade;
    }

    public int getThreePointerMade() {
        return threePointerMade;
    }

    public void setThreePointerMade(int threePointerMade) {
        this.threePointerMade = threePointerMade;
    }

    public int getFieldGoalAttempted() {
        return fieldGoalAttempted;
    }

    public void setFieldGoalAttempted(int fieldGoalAttempted) {
        this.fieldGoalAttempted = fieldGoalAttempted;
    }

    public int getThreePointerAttempted() {
        return threePointerAttempted;
    }

    public void setThreePointerAttempted(int threePointerAttempted) {
        this.threePointerAttempted = threePointerAttempted;
    }

    public int getFreeThrowMade() {
        return freeThrowMade;
    }

    public void setFreeThrowMade(int freeThrowMade) {
        this.freeThrowMade = freeThrowMade;
    }

    public int getFreeThrowAttempted() {
        return freeThrowAttempted;
    }

    public void setFreeThrowAttempted(int freeThrowAttempted) {
        this.freeThrowAttempted = freeThrowAttempted;
    }

    public int getRebounds() {
        return rebounds;
    }

    public void setRebounds(int rebounds) {
        this.rebounds = rebounds;
    }

    public int getAssists() {
        return assists;
    }

    public void setAssists(int assists) {
        this.assists = assists;
    }

    public int getSteal() {
        return steal;
    }

    public void setSteal(int steal) {
        this.steal = steal;
    }

    public int getBlock() {
        return block;
    }

    public void setBlock(int block) {
        this.block = block;
    }

    public int getTurnover() {
        return turnover;
    }

    public void setTurnover(int turnover) {
        this.turnover = turnover;
    }

    public GamesStats() {
    }

    public GamesStats(int id, Players playerId, Games gameId, String belongedTeam, int points, int fieldGoalMade, int fieldGoalAttempted, int threePointerMade, int threePointerAttempted, int freeThrowMade, int freeThrowAttempted, int rebounds, int assists, int steal, int block, int turnover) {
        this.id = id;
        this.playerId = playerId;
        this.gameId = gameId;
        this.points = points;
        this.fieldGoalMade = fieldGoalMade;
        this.fieldGoalAttempted = fieldGoalAttempted;
        this.threePointerMade = threePointerMade;
        this.threePointerAttempted = threePointerAttempted;
        this.freeThrowMade = freeThrowMade;
        this.freeThrowAttempted = freeThrowAttempted;
        this.rebounds = rebounds;
        this.assists = assists;
        this.steal = steal;
        this.block = block;
        this.turnover = turnover;
    }
}



