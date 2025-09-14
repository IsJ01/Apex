package com.ucor.auth.dto;

import java.util.List;

import lombok.Value;

@Value
public class CategoryFilter {
    String name;
    List<String> users;
}
