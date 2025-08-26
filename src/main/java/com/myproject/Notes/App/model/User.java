package com.myproject.Notes.App.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Column(unique = true, nullable = false)
    private String username;

    @NotBlank
    @JsonIgnore
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Note> notes;

    // Constructors
    public User() {}

    public User(String username, String passwordHash) {
        this.username = username;
        this.passwordHash = passwordHash;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public List<Note> getNotes() { return notes; }
    public void setNotes(List<Note> notes) { this.notes = notes; }

}
