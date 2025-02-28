package com.tasks.api.mapper;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Component;

@Component
public class LocalDateMapepr implements Mapper<String, LocalDate> {
    
    public LocalDate map(String date) {
        return Optional.ofNullable(date)
            .map(obj -> {
                if (!obj.isEmpty()) {
                    try {
                        return LocalDate.parse(obj);
                    } catch (Exception e) {
                        return null;
                    }
                }
                return null;
            })
            .orElse(null);
    }

}
