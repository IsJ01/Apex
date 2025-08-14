package com.ucor.auth.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ucor.auth.database.entity.Role;
import com.ucor.auth.database.repository.UserRepository;
import com.ucor.auth.dto.SignUp;
import com.ucor.auth.mapper.UserCreateMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserCreateMapper userCreateMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public UserDetails findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + id.toString()));
    }

    @Transactional
    public UserDetails create(SignUp signUp) {
        return Optional.of(signUp)
            .map(userCreateMapper::map)
            .map(userRepository::save)
            .get();
    }

    @Transactional
    public UserDetails updateRole(Long id, Role role) {
        return userRepository.findById(id)
            .map(user -> {
                user.setRole(role);
                return user;
            })
            .map(userRepository::saveAndFlush)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + id.toString()));
    }

}
