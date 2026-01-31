package com.codeclause.Event_Management_System_Backend.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codeclause.Event_Management_System_Backend.DTO.*;
import com.codeclause.Event_Management_System_Backend.Entity.Event;
import com.codeclause.Event_Management_System_Backend.Entity.User;
import com.codeclause.Event_Management_System_Backend.Repository.EventRepository;
import com.codeclause.Event_Management_System_Backend.Repository.UserRepository;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEventDTO createEvent(CreateEventDTO dto) {

        User user = userRepository.findById(dto.getCreatedBy())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Event event = Event.builder()
                .title(dto.getTitle())
                .location(dto.getLocation())
                .eventDate(dto.getEventDate())
                .description(dto.getDescription())
                .ticketPrice(dto.getTicketPrice())
                .createdBy(user)
                .build();

        Event savedEvent = eventRepository.save(event);

        return ResponseEventDTO.builder()
                .id(savedEvent.getId())
                .title(savedEvent.getTitle())
                .location(savedEvent.getLocation())
                .eventDate(savedEvent.getEventDate())
                .description(savedEvent.getDescription())
                .ticketPrice(savedEvent.getTicketPrice())
                .createdBy(savedEvent.getCreatedBy().getId())
                .build();
    }

    public List<ResponseEventDTO> getAllEvents() {
        return eventRepository.findAll()
                .stream()
                .map(event -> ResponseEventDTO.builder()
                        .id(event.getId())
                        .title(event.getTitle())
                        .location(event.getLocation())
                        .eventDate(event.getEventDate())
                        .description(event.getDescription())
                        .ticketPrice(event.getTicketPrice())
                        .createdBy(event.getCreatedBy().getId())
                        .build())
                .collect(Collectors.toList());
    }

    public List<ResponseEventDTO> getEventsByUser(Long userId) {
        return eventRepository.findByCreatedById(userId)
                .stream()
                .map(event -> ResponseEventDTO.builder()
                        .id(event.getId())
                        .title(event.getTitle())
                        .location(event.getLocation())
                        .eventDate(event.getEventDate())
                        .description(event.getDescription())
                        .ticketPrice(event.getTicketPrice())
                        .createdBy(event.getCreatedBy().getId())
                        .build())
                .collect(Collectors.toList());
    }
}
