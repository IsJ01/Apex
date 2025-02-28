package com.tasks.api.http.rest;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.tasks.api.database.entity.Status;
import com.tasks.api.dto.PageResponse;
import com.tasks.api.dto.TaskCreateEditDto;
import com.tasks.api.dto.TaskFilter;
import com.tasks.api.dto.TaskReadDto;
import com.tasks.api.http.connection.UsersUrlConnection;
import com.tasks.api.service.TaskService;

import lombok.RequiredArgsConstructor;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.notFound;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;


@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
@RequestMapping(value = "/api/v1")
@RequiredArgsConstructor
public class TaskRestContoller {

    private final TaskService taskService;

    @GetMapping("/statuses/")
    public List<String> get_statuses() {
        return List.of(Status.values()).stream()
            .map(status -> status.name())
            .toList();
    }

    @GetMapping("/")
    public PageResponse<TaskReadDto> findAll(TaskFilter filter, Pageable pageable) {
        Page<TaskReadDto> page = taskService.findAll(filter, pageable);
        return PageResponse.of(page);
    }

    @GetMapping("/{id}/")
    public TaskReadDto findById(@PathVariable("id") Integer id) {
        return taskService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
    
    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@Validated @ModelAttribute TaskCreateEditDto task,
                                @RequestHeader("Sessionid") String sessionid) {
        try { 
            if (UsersUrlConnection.is_superUser(task.getResponsible())) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            boolean is_current = UsersUrlConnection.is_current(sessionid, task.getOf());
            if (is_current) {
                return new ResponseEntity<>(taskService.create(task), HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } 
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
    }
    
    @PutMapping("/{id}/")
    public ResponseEntity<?> update(@PathVariable Integer id, @Validated @ModelAttribute TaskCreateEditDto task,
                        @RequestHeader("Sessionid") String sessionid) {
        try {
            if (UsersUrlConnection.is_superUser(task.getResponsible())) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            var of = taskService.findById(id).get().getOf();
            boolean is_current = UsersUrlConnection.is_current(sessionid, of);
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

    @PatchMapping("/{id}/")
    public ResponseEntity<?> patch(@PathVariable Integer id, @ModelAttribute TaskCreateEditDto task,
                        @RequestHeader("Sessionid") String sessionid) {
        try {
            if (UsersUrlConnection.is_superUser(task.getResponsible())) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            var of = taskService.findById(id).get().getOf();
            boolean is_current = UsersUrlConnection.is_current(sessionid, of);
            if (is_current) {
                return new ResponseEntity<>(taskService.patch(id, task)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)),
                    HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @PatchMapping("/check/{id}/")
    public ResponseEntity<?> check(@PathVariable Integer id, @ModelAttribute TaskCreateEditDto task,
                        @RequestHeader("Sessionid") String sessionid) {
        try {
            if (UsersUrlConnection.is_superUser(task.getResponsible())) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            var responsible = taskService.findById(id).get().getResponsible();
            boolean is_current = UsersUrlConnection.is_current(sessionid, responsible);
            if (is_current) {
                return new ResponseEntity<>(taskService.patch(id, task)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)),
                    HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}/")
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
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
    }
}
