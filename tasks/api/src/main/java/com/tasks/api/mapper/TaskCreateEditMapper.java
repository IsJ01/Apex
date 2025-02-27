package com.tasks.api.mapper;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.tasks.api.database.entity.FileInfo;
import com.tasks.api.database.entity.Status;
import com.tasks.api.database.entity.Task;
import com.tasks.api.database.repository.FileInfoRepository;
import com.tasks.api.dto.FileInfoReadDto;
import com.tasks.api.dto.TaskCreateEditDto;
import com.tasks.api.service.FileInfoService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TaskCreateEditMapper implements Mapper<TaskCreateEditDto, Task> {

    private final FileInfoService fileService;
    private final FileInfoRepository fileInfoRepository;

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

    public Task patchMap(TaskCreateEditDto dto, Task task) {
        if (dto.getResponsible() != null) {
            task.setResponsible(dto.getResponsible());
        }
        if (dto.getTitle() != null) {
            task.setTitle(dto.getTitle());
        }
        if (dto.getDescription() != null) {
            task.setDescription(dto.getDescription());
        }
        if (dto.getLastDate() != null) {
            if (!dto.getLastDate().isEmpty()) {
                task.setLastDate(LocalDate.parse(dto.getLastDate()));
            } else {
                task.setLastDate(null);
            }
        }
        if (dto.getChecked() != null) {
            task.setChecked(dto.getChecked());
        }        
        if (dto.getFile() != null) {
            try {
                FileInfoReadDto fileInfoReadDto = fileService.create(dto.getFile());
                if (task.getFile() != null) {
                    fileService.delete(task.getFile().getId());
                }
                task.setFile(fileInfoRepository.findById(fileInfoReadDto.getId()).get());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        if (dto.getRepetitive() != null) {
            task.setRepetitive(dto.getRepetitive());
        }
        if (dto.getStatus() != null) {
            task.setStatus(dto.getStatus());
        }
        return task;
    }

    private Task copy(TaskCreateEditDto dto, Task task) {
        FileInfo fileInfo = Optional.ofNullable(dto.getFile())
            .map(file -> {
                try {
                    FileInfoReadDto fileInfoReadDto = fileService.create(file);
                    return fileInfoRepository.findById(fileInfoReadDto.getId()).get();
                } catch (Exception e) {
                    return null;
                }
            })
            .orElse(null);

        LocalDate date = Optional.ofNullable(dto.getLastDate())
            .map(LocalDate::parse)
            .orElse(null);
        Status status = Optional.ofNullable(dto.getStatus())
            .orElse(Status.IN_PROGRESS);
        Boolean checked = Optional.ofNullable(dto.getChecked())
            .orElse(false);
        Boolean repetitive = Optional.ofNullable(dto.getRepetitive())
            .orElse(false);

        task.setOf(dto.getOf());                 
        task.setResponsible(dto.getResponsible());
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setFile(fileInfo);
        task.setLastDate(date);
        task.setChecked(checked);
        task.setRepetitive(repetitive);
        task.setStatus(status);
        return task;
    }

}
