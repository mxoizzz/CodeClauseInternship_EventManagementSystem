package com.codeclause.Event_Management_System_Backend.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.codeclause.Event_Management_System_Backend.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
