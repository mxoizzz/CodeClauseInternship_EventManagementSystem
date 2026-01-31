package com.codeclause.Event_Management_System_Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.codeclause.Event_Management_System_Backend.Entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCreatedById(Long userId);
}
