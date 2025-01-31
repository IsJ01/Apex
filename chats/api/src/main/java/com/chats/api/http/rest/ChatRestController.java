package com.chats.api.http.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.chats.api.dto.ChatCreateEditDto;
import com.chats.api.dto.ChatReadDto;

import com.chats.api.service.ChatService;
import com.chats.api.http.connection.UsersUrlConnection;

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
@RequestMapping("/api/v1/chats")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
@RequiredArgsConstructor
public class ChatRestController {

    private final ChatService chatService;
    
    @GetMapping("/")
    public List<ChatReadDto> findAll(@RequestHeader("Sessionid") String sessionid) {
        return chatService.findAll();
    }
    
    @GetMapping("/{id}/")
    public ChatReadDto findById(@PathVariable Long id, @RequestHeader("Sessionid") String sessionid) {
        return chatService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
    
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@Validated @RequestBody ChatCreateEditDto chatDto,
                            @RequestHeader("Sessionid") String sessionid) {
        try { 
            boolean is_current = UsersUrlConnection.is_current(sessionid, chatDto.getUser1());
            if (is_current) {
                return new ResponseEntity<>(chatService.create(chatDto), HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } 
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
       
    }
    
    @PutMapping("/{id}/")
    public ResponseEntity<?> update(@PathVariable Long id, @Validated @RequestBody ChatCreateEditDto chatDto,
                                @RequestHeader("Sessionid") String sessionid) {
        try {
            boolean is_current = UsersUrlConnection.is_current(sessionid, chatDto.getUser1());
            if (is_current) {
                return new ResponseEntity<>(chatService.update(id, chatDto)
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
            boolean is_current = UsersUrlConnection.is_current(sessionid, chatService.findById(id).get().getUser1());
            if (is_current) {
                return chatService.delete(id)
                    ? noContent().build()
                    : notFound().build();
            }
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
