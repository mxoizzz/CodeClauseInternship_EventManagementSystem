package com.codeclause.Event_Management_System_Backend.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseTicketDTO {
    private Long id;
    private Long userId;
    private Long eventId;
    private Integer quantity;
    private BigDecimal totalPrice;
    private LocalDateTime bookedAt;
}
