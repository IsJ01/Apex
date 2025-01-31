package com.tasks.api.integration.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.tasks.api.database.entity.Status;
import com.tasks.api.dto.TaskCreateEditDto;
import com.tasks.api.integration.IntegrationTestBase;
import com.tasks.api.service.TaskService;

public class TaskServiceIT extends IntegrationTestBase {

    @Autowired
    private TaskService taskService;

    @Test
    public void testCreate() {
        var dto = new TaskCreateEditDto(0, 1, "Tak nada", Status.IN_PROGRESS);
        assertEquals(taskService.create(dto).getStatus(), Status.IN_PROGRESS);
    }

    @Test
    public void testFindAll() {
        var result = taskService.findAll();
        assertEquals(result.size(), 1);
    }

    @Test
    public void testUpdate() {
        var dto = new TaskCreateEditDto(0, 1, "Tak nada :)", Status.IN_PROGRESS);
        var result = taskService.update(1, dto);
        assertEquals(result.get().getDescription(), "Tak nada :)");
    }

    @Test
    public void testDelete() {
        var result = taskService.delete(1);
        assertTrue(result);
    }

}
