package com.ucor.auth.mapper;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.ucor.auth.database.entity.User;
import com.ucor.auth.dto.UserPatchDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserPatchMapper {

    private final PasswordEncoder passwordEncoder;

    public User map(User user, UserPatchDto userPatchDto) {
        if (userPatchDto.getTelephoneNumber() != null) {
            user.setTelephoneNumber(userPatchDto.getTelephoneNumber());
        }
        if (userPatchDto.getYear() != null) {
            user.setYear(userPatchDto.getYear());
        }
        if (userPatchDto.getRole() != null) {
            user.setRole(userPatchDto.getRole());
        }
        // if (userPatchDto.getPassword() != null) {
        //     user.setPassword(
        //         passwordEncoder.encode(userPatchDto.getPassword())
        //     );
        // }
        return user;
    }

}
