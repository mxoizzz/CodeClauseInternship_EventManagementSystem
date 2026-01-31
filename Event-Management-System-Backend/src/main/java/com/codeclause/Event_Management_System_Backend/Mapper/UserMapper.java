package com.codeclause.Event_Management_System_Backend.Mapper;

import com.codeclause.Event_Management_System_Backend.DTO.RegisterUserDTO;
import com.codeclause.Event_Management_System_Backend.DTO.ResponseUserDTO;
import com.codeclause.Event_Management_System_Backend.Entity.User;

public class UserMapper {

    public static User toEntity(RegisterUserDTO dto) {
        if (dto == null) return null;

        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .build();
    }

    public static ResponseUserDTO toDTO(User user) {
        if (user == null) return null;

        return ResponseUserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
