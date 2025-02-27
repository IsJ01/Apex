package com.tasks.api.database.entity;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tasks")
@Builder
@Entity
public class Task implements BaseEntity<Integer> {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer of;

    @Column(nullable = false)
    private Integer responsible;
    
    @Column(nullable = false)
    private String title;

    @Column(length = 10000)
    private String description;

    @Builder.Default
    private Boolean repetitive = false;

    @Builder.Default
    private Boolean checked = false;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "file_id")
    private FileInfo file;

    @Builder.Default
    private LocalDate firstDate = LocalDate.now();

    private LocalDate lastDate;
    
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Status status = Status.IN_PROGRESS;
}
