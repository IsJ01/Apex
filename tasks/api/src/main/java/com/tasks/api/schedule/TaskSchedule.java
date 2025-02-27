package com.tasks.api.schedule;

import java.time.LocalDate;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.tasks.api.database.entity.Status;
import com.tasks.api.database.entity.Task;
import com.tasks.api.database.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TaskSchedule {

    private final TaskRepository taskRepository;

    @Scheduled(fixedDelay = 1000 * 60 * 60 * 24)
    public void update_tasks() {
        for (Task task: taskRepository.findByRepetitive(true)) {
            task.setChecked(false);
            task.setLastDate(LocalDate.now().plusDays(1));
            task.setStatus(Status.IN_PROGRESS);
            taskRepository.saveAndFlush(task);
        }
    }

}
