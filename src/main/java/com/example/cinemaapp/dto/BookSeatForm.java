package com.example.cinemaapp.dto;

public class BookSeatForm {

    private int sessionId;
    private int toBook;

    public BookSeatForm() {
    }

    public BookSeatForm(int sessionId, int toBook) {
        this.sessionId = sessionId;
        this.toBook = toBook;
    }

    public int getSessionId() {
        return sessionId;
    }

    public void setSessionId(int sessionId) {
        this.sessionId = sessionId;
    }

    public int getToBook() {
        return toBook;
    }

    public void setToBook(int toBook) {
        this.toBook = toBook;
    }
}
