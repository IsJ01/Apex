package com.tasks.api.http.rest;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.tasks.api.dto.PageResponse;
import com.tasks.api.dto.TaskCreateEditDto;
import com.tasks.api.dto.TaskFilter;
import com.tasks.api.dto.TaskReadDto;
import com.tasks.api.http.connection.UsersUrlConnection;
import com.tasks.api.service.TaskService;

import lombok.RequiredArgsConstructor;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.notFound;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class TaskRestContoller {

    private final TaskService taskService;

    @GetMapping("/")
    public PageResponse<TaskReadDto> findAll(TaskFilter filter, Pageable pageable) {
        Page<TaskReadDto> page = taskService.findAll(filter, pageable);
        return PageResponse.of(page);
    }

    @GetMapping("/{id}")
    public TaskReadDto findById(@PathVariable("id") Integer id) {
        return taskService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
    
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@Validated @RequestBody TaskCreateEditDto task,
                                @RequestHeader("Sessionid") String sessionid) {
        try { 
            boolean is_current = UsersUrlConnection.is_current(sessionid, task.getOf());
            if (is_current) {
                return new ResponseEntity<>(taskService.create(task), HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } 
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @Validated @RequestBody TaskCreateEditDto task,
                        @RequestHeader("Sessionid") String sessionid) {
        try {
            boolean is_current = UsersUrlConnection.is_current(sessionid, task.getOf());
            if (is_current) {
                return new ResponseEntity<>(taskService.update(id, task)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)),
                    HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id, 
                                @RequestHeader("Sessionid") String sessionid) {
        try {
            boolean is_current = UsersUrlConnection.is_current(sessionid, taskService.findById(id).get().getOf());
            if (is_current) {
                return taskService.delete(id)
                    ? noContent().build()
                    : notFound().build();
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
    }
}
