package com.tasks.api.database.repository;

import java.util.List;

import com.tasks.api.database.entity.Task;
import com.tasks.api.dto.TaskFilter;

public interface FilterTaskRepository {

    List<Task> findAllByFilter(TaskFilter filter);
}
