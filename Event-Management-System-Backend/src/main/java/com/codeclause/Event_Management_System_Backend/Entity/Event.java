package com.codeclause.Event_Management_System_Backend.Entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String location;

    @Column(nullable = false)
    private LocalDateTime eventDate;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private BigDecimal ticketPrice;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
