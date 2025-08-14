package com.ucor.auth.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.ucor.auth.database.entity.Role;
import com.ucor.auth.database.entity.User;
import com.ucor.auth.dto.SignUp;
import com.ucor.auth.service.UserDetailsServiceImpl;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InitCommandLiner implements CommandLineRunner {

    private final PasswordEncoder passwordEncoder;
    private final UserDetailsServiceImpl userDetailsService;
    
    @Value("${admin.pass}")
    private String ADMIN_PASS;

    @Value("${admin.number}")
    private String ADMIN_NUMBER;

    @Value("${admin.year}")
    private Integer ADMIN_YEAR;

    @Override
    public void run(String... args) throws Exception {
        try {
            userDetailsService.loadUserByUsername("admin");
        } catch (UsernameNotFoundException e) {
            SignUp signUp = new SignUp(
                "admin", 
                passwordEncoder.encode(ADMIN_PASS), 
                ADMIN_NUMBER, 
                ADMIN_YEAR
            );
            User user = (User) userDetailsService.create(signUp);
            user.setRole(Role.ADMIN);
            userDetailsService.updateRole(user.getId(), Role.ADMIN);
        }
    }

}
