package com.codeclause.Event_Management_System_Backend.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookTicketDTO {
    private Long userId;
    private Long eventId;
    private Integer quantity;
}
