package com.codeclause.Event_Management_System_Backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.codeclause.Event_Management_System_Backend.DTO.*;
import com.codeclause.Event_Management_System_Backend.Entity.User;
import com.codeclause.Event_Management_System_Backend.Mapper.UserMapper;
import com.codeclause.Event_Management_System_Backend.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseUserDTO registerUser(RegisterUserDTO dto) {

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = UserMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        User savedUser = userRepository.save(user);

        return UserMapper.toDTO(savedUser);
    }

    public ResponseUserDTO loginUser(LoginUserDTO dto) {

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return UserMapper.toDTO(user);
    }
}
