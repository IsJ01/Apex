package com.tasks.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileConfig {
    
    @Value("${fiels.path}")
    private static String filePath;
}
