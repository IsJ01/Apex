package com.tasks.api.mapper;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.tasks.api.database.entity.Task;
import com.tasks.api.dto.TaskReadDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TaskReadMapper implements Mapper<Task, TaskReadDto> {

    private final FileReadMapper fileReadMapper;

    public TaskReadDto map(Task task) {
        var file = Optional.ofNullable(task.getFile())
            .map(fileReadMapper::map)
            .orElse(null);
        return new TaskReadDto(
            task.getId(), 
            task.getOf(), 
            task.getResponsible(), 
            task.getTitle(),
            task.getDescription(),
            file,
            task.getFirstDate(),
            task.getLastDate(),
            task.getChecked(),
            task.getRepetitive(),
            task.getStatus()
        );
    }

}
