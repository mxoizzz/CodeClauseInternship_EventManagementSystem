package com.codeclause.Event_Management_System_Backend.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.codeclause.Event_Management_System_Backend.Entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByEventId(Long eventId);
    List<Ticket> findByUserId(Long userId);
}
