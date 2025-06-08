// Source code is decompiled from a .class file using FernFlower decompiler.
package com.tasks.api.database.entity;

import java.time.LocalDate;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.PathMetadataFactory;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.EnumPath;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.BooleanPath;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.core.types.dsl.DatePath;

public class QTask extends EntityPathBase<Task> {
   private static final long serialVersionUID = -1350069090L;
   public static final QTask task = new QTask("task");
   public final StringPath title = this.createString("title");
   public final StringPath description = this.createString("description");
   public final NumberPath<Integer> responsible = this.createNumber("responsible", Integer.class);
   public final BooleanPath repetitive = this.createBoolean("repetitive");
   public final BooleanPath checked = this.createBoolean("checked");
   public final DatePath<LocalDate> firstDate = this.createDate("firstDate", LocalDate.class);
   public final DatePath<LocalDate> lastDate = this.createDate("lastDate", LocalDate.class);
   public final NumberPath<Integer> id = this.createNumber("id", Integer.class);
   public final NumberPath<Integer> near = this.createNumber("near", Integer.class);
   public final NumberPath<Integer> of = this.createNumber("of", Integer.class);
   public final EnumPath<Status> status = this.createEnum("status", Status.class);

   public QTask(String variable) {
      super(Task.class, PathMetadataFactory.forVariable(variable));
   }

   public QTask(Path<? extends Task> path) {
      super(path.getType(), path.getMetadata());
   }

   public QTask(PathMetadata metadata) {
      super(Task.class, metadata);
   }
}
