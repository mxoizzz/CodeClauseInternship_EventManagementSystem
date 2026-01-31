package com.codeclause.Event_Management_System_Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.codeclause.Event_Management_System_Backend.DTO.*;
import com.codeclause.Event_Management_System_Backend.Service.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseUserDTO registerUser(@RequestBody RegisterUserDTO userDTO) {
        return userService.registerUser(userDTO);
    }

    @PostMapping("/login")
    public ResponseUserDTO loginUser(@RequestBody LoginUserDTO userDTO) {
        return userService.loginUser(userDTO);
    }
}
