package com.bball.bball.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "players", schema = "crudplayers")
public class Players {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //tells mySQL id is unique
    private int id;
    @Column
    private String name;
    @Column
    private double height;
    @Column
    private double weight;
    @Column
    private int age;
    @Column
    private String birthdate;

    public Players() { }

    public Players(String name, int id, double height, double weight, int age, String birthdate) {
        this.name = name;
        this.id = id;
        this.height = height;
        this.weight = weight;
        this.age = age;
        this.birthdate = birthdate;
    }

    public void setAge(int age){
        this.age = age;
    }
    public int getAge(){
        return age;
    }
    public void setBirthdate(String birthdate){
        this.birthdate = birthdate;
    }
    public String getBirthdate(){
        return birthdate;
    }
    public void setWeight(double weight){
        this.weight = weight;
    }
    public double getWeight(){
        return weight;
    }
    public void setHeight(double height){
        this.height = height;
    }
    public double getHeight(){
        return height;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public void setId(int id){
        this.id = id;
    }
    public int getId(){
        return id;
    }

}
