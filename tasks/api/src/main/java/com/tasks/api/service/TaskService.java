package com.tasks.api.service;

import java.util.List;
import java.util.Optional;

import static com.tasks.api.database.entity.QTask.task;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tasks.api.database.querydsl.QPredicates;
import com.tasks.api.database.repository.TaskRepository;
import com.tasks.api.dto.TaskCreateEditDto;
import com.tasks.api.dto.TaskFilter;
import com.tasks.api.dto.TaskReadDto;
import com.tasks.api.mapper.TaskCreateEditMapper;
import com.tasks.api.mapper.TaskReadMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskReadMapper taskReadMapper;
    private final TaskCreateEditMapper taskCreateEditMapper;

    public List<TaskReadDto> findAll() {
        return taskRepository.findAll().stream()
                .map(taskReadMapper::map)
                .toList();
    }

    public Page<TaskReadDto> findAll(TaskFilter filter, Pageable pageable) {
        var predicate = QPredicates.builder()
                .add(filter.getOf(), task.of::eq)
                .add(filter.getResponsible(), task.responsible::eq)
                .add(filter.getRepetitive(), task.repetitive::eq)
                .add(filter.getChecked(), task.checked::eq)
                .add(filter.getDescription(), task.description::containsIgnoreCase)
                .add(filter.getStatus(), task.status::in)
                .build();
        return taskRepository.findAll(predicate, pageable)
                .map(taskReadMapper::map);
    }

    public List<TaskReadDto> findAllByRepetitive(Boolean repetitive) {
        return taskRepository.findByRepetitive(repetitive).stream()
            .map(taskReadMapper::map)
            .toList();
    }

    public Optional<TaskReadDto> findById(Integer id) {
        return taskRepository.findById(id).map(taskReadMapper::map);
    }

    @Transactional
    public TaskReadDto create(TaskCreateEditDto dto) {
        return Optional.of(dto)
                .map(taskCreateEditMapper::map)
                .map(taskRepository::save)
                .map(taskReadMapper::map)
                .get();
    }

    @Transactional
    public Optional<TaskReadDto> update(Integer id, TaskCreateEditDto dto) {
        return taskRepository.findById(id)
            .map(entity -> taskCreateEditMapper.map(dto, entity))
            .map(taskRepository::saveAndFlush)
            .map(taskReadMapper::map);
    }

    @Transactional
    public Optional<TaskReadDto> patch(Integer id, TaskCreateEditDto dto) {
        return taskRepository.findById(id)
            .map(entity -> taskCreateEditMapper.patchMap(dto, entity))
            .map(taskRepository::saveAndFlush)
            .map(taskReadMapper::map);
    }

    @Transactional
    public boolean delete(Integer id) {
        return taskRepository.findById(id)
                .map(entity -> {
                    taskRepository.delete(entity);
                    return true;
                })
                .orElse(false);
    }
}
