package com.codeclause.Event_Management_System_Backend.DTO;

import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseUserDTO {
    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
}
