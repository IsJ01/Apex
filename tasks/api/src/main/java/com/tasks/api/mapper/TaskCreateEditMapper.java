package com.tasks.api.mapper;

import org.springframework.stereotype.Component;

import com.tasks.api.database.entity.Task;
import com.tasks.api.dto.TaskCreateEditDto;

@Component
public class TaskCreateEditMapper implements Mapper<TaskCreateEditDto, Task> {

    @Override
    public Task map(TaskCreateEditDto object) {
        Task task = new Task();
        copy(object, task);
        return task;
    }

    @Override
    public Task map(TaskCreateEditDto object, Task task) {
        copy(object, task);
        return task;
    }

    private Task copy(TaskCreateEditDto dto, Task task) {
        task.setOf(dto.getOf());
        task.setNear(dto.getNear());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());
        return task;
    }

}
