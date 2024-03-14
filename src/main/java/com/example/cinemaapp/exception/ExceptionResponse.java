package com.example.cinemaapp.exception;

public class ExceptionResponse {

    private String errorMessage;

    public ExceptionResponse() {
    }

    public ExceptionResponse(String message) {
        this.errorMessage = message;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
