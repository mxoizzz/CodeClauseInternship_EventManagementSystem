package com.codeclause.Event_Management_System_Backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.codeclause.Event_Management_System_Backend.DTO.*;
import com.codeclause.Event_Management_System_Backend.Service.TicketService;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping
    public ResponseTicketDTO bookTicket(@RequestBody BookTicketDTO dto) {
        return ticketService.bookTicket(dto);
    }

    @GetMapping("/event/{eventId}")
public List<ResponseTicketDTO> getAttendees(
        @PathVariable Long eventId,
        @RequestParam Long userId) {

    return ticketService.getAttendeesByEvent(eventId, userId);
}


    @GetMapping("/user/{userId}")
    public List<ResponseTicketDTO> getUserTickets(@PathVariable Long userId) {
        return ticketService.getTicketsByUser(userId);
    }
}
