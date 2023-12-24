package com.example.cinemaapp.model;

import com.example.cinemaapp.exception.RegisterException;

import java.util.regex.Pattern;

public class RegisterForm {

    private String login;
    private String password;
    private final String regexPattern = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";;

    public RegisterForm(String login, String password) throws RegisterException {
        if(patternMatches(login,regexPattern)){
            this.login = login;
            this.password = password;
        }else {
            throw new RegisterException("wrong email");
        }
    }

    public static boolean patternMatches(String emailAddress, String regexPattern) {
        return Pattern.compile(regexPattern)
                .matcher(emailAddress)
                .matches();
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
