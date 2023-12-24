package com.example.cinemaapp.model;

import javax.persistence.*;

@Entity
@Table(name = "sys_user")
public class SysUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "login", length = 100)
    private String login;

    @Column(name = "pass", length = 100)
    private String pass;

    @Column(name = "user_role", length = 100)
    private String userRole;

    public SysUser() {
    }

    public SysUser(String login, String pass, String userRole) {
        this.login = login;
        this.pass = pass;
        this.userRole = userRole;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

}