package com.tasks.api.database.repository;

import java.util.List;

import static com.tasks.api.database.entity.QTask.task;

import com.querydsl.jpa.impl.JPAQuery;
import com.tasks.api.database.entity.Task;
import com.tasks.api.database.querydsl.QPredicates;
import com.tasks.api.dto.TaskFilter;
import com.tasks.api.mapper.LocalDateMapepr;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class FilterTaskRepositoryImpl implements FilterTaskRepository {

    private final EntityManager entityManager;
    private final LocalDateMapepr localDateMapepr;

    @Override
    public List<Task> findAllByFilter(TaskFilter filter) {
        var predicate = QPredicates.builder()
                .add(filter.getOf(), task.of::eq)
                .add(filter.getResponsible(), task.responsible::eq)
                .add(localDateMapepr.map(filter.getFirstDate()), task.firstDate::after)
                .add(localDateMapepr.map(filter.getLastDate()), task.lastDate::before)
                .add(filter.getRepetitive(), task.repetitive::eq)
                .add(filter.getChecked(), task.checked::eq)
                .add(filter.getStatus(), task.status::in)
                .build();
        
        return new JPAQuery<Task>(entityManager)
                    .select(task)
                    .from(task)
                    .where(predicate)
                    .fetch();
    }

}
