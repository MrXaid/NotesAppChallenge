package com.myproject.Notes.App.controller;

import com.myproject.Notes.App.dto.NoteRequest;
import com.myproject.Notes.App.model.Note;
import com.myproject.Notes.App.model.User;
import com.myproject.Notes.App.repository.NoteRepository;
import com.myproject.Notes.App.repository.UserRepository;
import com.myproject.Notes.App.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return userRepository.findByUsername(userPrincipal.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public ResponseEntity<?> createNote(@Valid @RequestBody NoteRequest noteRequest,
                                        Authentication authentication) {
        try {
            User user = getCurrentUser(authentication);

            Note note = new Note(noteRequest.getTitle(), noteRequest.getContent(), user);
            Note savedNote = noteRepository.save(note);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedNote);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating note: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes(Authentication authentication) {
        try {
            User user = getCurrentUser(authentication);
            List<Note> notes = noteRepository.findByUserOrderByUpdatedAtDesc(user);
            return ResponseEntity.ok(notes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNoteById(@PathVariable Long id, Authentication authentication) {
        try {
            User user = getCurrentUser(authentication);
            Optional<Note> noteOptional = noteRepository.findByIdAndUser(id, user);

            return noteOptional.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving note: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNote(@PathVariable Long id,
                                        @Valid @RequestBody NoteRequest noteRequest,
                                        Authentication authentication) {
        try {
            User user = getCurrentUser(authentication);
            Optional<Note> noteOptional = noteRepository.findByIdAndUser(id, user);

            if (noteOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Note note = noteOptional.get();

            // Optimistic locking check
            if (noteRequest.getUpdatedAt() != null &&
                    !note.getUpdatedAt().equals(noteRequest.getUpdatedAt())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Error: Note has been modified by another user. Please refresh and try again.");
            }

            note.setTitle(noteRequest.getTitle());
            note.setContent(noteRequest.getContent());
            note.setUpdatedAt(LocalDateTime.now());

            Note updatedNote = noteRepository.save(note);
            return ResponseEntity.ok(updatedNote);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating note: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id, Authentication authentication) {
        try {
            User user = getCurrentUser(authentication);
            Optional<Note> noteOptional = noteRepository.findByIdAndUser(id, user);

            if (noteOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            noteRepository.deleteByIdAndUser(id, user);
            return ResponseEntity.noContent().build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting note: " + e.getMessage());
        }
    }
}
