package com.codeclause.Event_Management_System_Backend.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codeclause.Event_Management_System_Backend.DTO.*;
import com.codeclause.Event_Management_System_Backend.Entity.*;
import com.codeclause.Event_Management_System_Backend.Repository.*;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    public ResponseTicketDTO bookTicket(BookTicketDTO dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = eventRepository.findById(dto.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        BigDecimal totalPrice = event.getTicketPrice()
                .multiply(BigDecimal.valueOf(dto.getQuantity()));

        Ticket ticket = Ticket.builder()
                .user(user)
                .event(event)
                .quantity(dto.getQuantity())
                .totalPrice(totalPrice)
                .build();

        Ticket savedTicket = ticketRepository.save(ticket);

        return ResponseTicketDTO.builder()
                .id(savedTicket.getId())
                .userId(user.getId())
                .eventId(event.getId())
                .quantity(savedTicket.getQuantity())
                .totalPrice(savedTicket.getTotalPrice())
                .bookedAt(savedTicket.getBookedAt())
                .build();
    }

    public List<ResponseTicketDTO> getAttendeesByEvent(Long eventId, Long userId) {

    Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new RuntimeException("Event not found"));

    if (!event.getCreatedBy().getId().equals(userId)) {
        throw new RuntimeException("You are not authorized to view attendees for this event");
    }

    return ticketRepository.findByEventId(eventId)
            .stream()
            .map(ticket -> ResponseTicketDTO.builder()
                    .id(ticket.getId())
                    .userId(ticket.getUser().getId())
                    .eventId(ticket.getEvent().getId())
                    .quantity(ticket.getQuantity())
                    .totalPrice(ticket.getTotalPrice())
                    .bookedAt(ticket.getBookedAt())
                    .build())
            .toList();
}


    public List<ResponseTicketDTO> getTicketsByUser(Long userId) {

        return ticketRepository.findByUserId(userId)
                .stream()
                .map(ticket -> ResponseTicketDTO.builder()
                        .id(ticket.getId())
                        .userId(ticket.getUser().getId())
                        .eventId(ticket.getEvent().getId())
                        .quantity(ticket.getQuantity())
                        .totalPrice(ticket.getTotalPrice())
                        .bookedAt(ticket.getBookedAt())
                        .build())
                .collect(Collectors.toList());
    }
}
