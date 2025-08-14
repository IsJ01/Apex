package com.ucor.auth.mapper;

import org.springframework.stereotype.Component;

import com.ucor.auth.database.entity.User;
import com.ucor.auth.dto.SignUp;

@Component
public class UserCreateMapper {

    public User map(SignUp signUp) {
        User user = new User();
        user.setUsername(signUp.getUsername());
        user.setPassword(signUp.getPassword());
        user.setTelephoneNumber(signUp.getTelephoneNumber());
        user.setYear(signUp.getYear());
        return user;
    }

}
