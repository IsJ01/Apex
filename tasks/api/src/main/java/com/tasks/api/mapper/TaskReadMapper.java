package com.tasks.api.mapper;

import org.springframework.stereotype.Component;

import com.tasks.api.database.entity.Task;
import com.tasks.api.dto.TaskReadDto;

@Component
public class TaskReadMapper implements Mapper<Task, TaskReadDto> {

    public TaskReadDto map(Task task) {
        return new TaskReadDto(
            task.getId(), 
            task.getOf(), 
            task.getNear(), 
            task.getDescription(),
            task.getStatus()
        );
    }

}
