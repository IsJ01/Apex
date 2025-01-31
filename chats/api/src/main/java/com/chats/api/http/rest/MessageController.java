package com.chats.api.http.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.chats.api.dto.MessageCreateEditDto;
import com.chats.api.dto.MessageReadDto;
import com.chats.api.http.connection.UsersUrlConnection;
import com.chats.api.service.MessageService;

import lombok.RequiredArgsConstructor;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.notFound;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;


@RestController
@RequestMapping("/api/v1/messages")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/")
    public List<MessageReadDto> findAll() {
        return messageService.findAll();
    }

    @GetMapping("/{id}/")
    public MessageReadDto findById(@PathVariable Long id) {
        return messageService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
    
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@Validated @RequestBody MessageCreateEditDto messageDto,
                            @RequestHeader("Sessionid") String sessionid) {
        try { 
            boolean is_current = UsersUrlConnection.is_current(sessionid, messageDto.getOf());
            if (is_current) {
                return new ResponseEntity<>(messageService.create(messageDto), HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } 
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}/")
    public ResponseEntity<?> update(@PathVariable Long id, @Validated @RequestBody MessageCreateEditDto messageDto,
                            @RequestHeader("Sessionid") String sessionid) {
        try {
            boolean is_current = UsersUrlConnection.is_current(sessionid, messageDto.getOf());
            if (is_current) {
                return new ResponseEntity<>(messageService.update(id, messageDto)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)),
                    HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}/")
    public ResponseEntity<?> delete(@PathVariable Long id, @RequestHeader("Sessionid") String sessionid) {
        try {
            boolean is_current = UsersUrlConnection.is_current(sessionid, messageService.findById(id).get().getOf());
            if (is_current) {
                return messageService.delete(id)
                    ? noContent().build()
                    : notFound().build();
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
