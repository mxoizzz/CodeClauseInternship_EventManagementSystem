package com.codeclause.Event_Management_System_Backend.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginUserDTO {
    private String email;
    private String password;
}
