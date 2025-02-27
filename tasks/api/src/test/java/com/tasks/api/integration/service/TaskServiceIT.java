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

}
