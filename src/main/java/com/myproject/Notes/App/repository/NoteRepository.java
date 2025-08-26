package com.myproject.Notes.App.repository;

import com.myproject.Notes.App.model.Note;
import com.myproject.Notes.App.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByUserOrderByUpdatedAtDesc(User user);

    Optional<Note> findByIdAndUser(Long id, User user);

    void deleteByIdAndUser(Long id, User user);
}
