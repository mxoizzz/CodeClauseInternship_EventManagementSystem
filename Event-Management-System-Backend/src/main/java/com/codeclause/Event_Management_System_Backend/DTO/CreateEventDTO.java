package com.codeclause.Event_Management_System_Backend.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateEventDTO {
    private String title;
    private String location;
    private LocalDateTime eventDate;
    private String description;
    private BigDecimal ticketPrice;
    private Long createdBy;
}
