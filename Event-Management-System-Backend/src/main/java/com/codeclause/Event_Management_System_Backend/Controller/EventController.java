package com.codeclause.Event_Management_System_Backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.codeclause.Event_Management_System_Backend.DTO.*;
import com.codeclause.Event_Management_System_Backend.Service.EventService;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping
    public ResponseEventDTO createEvent(@RequestBody CreateEventDTO dto) {
        return eventService.createEvent(dto);
    }

    @GetMapping
    public List<ResponseEventDTO> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/my/{userId}")
    public List<ResponseEventDTO> getMyEvents(@PathVariable Long userId) {
        return eventService.getEventsByUser(userId);
    }
}
