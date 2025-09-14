package com.ucor.auth.database.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "t_users")
public class User implements UserDetails, BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String telephoneNumber;

    @Builder.Default
    private Integer year = 2000;

    @JsonIgnoreProperties
    @Builder.Default
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories = new ArrayList<>();

    @Builder.Default
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    public static boolean isAdmin(UserDetails userDetails) {
        return userDetails.getAuthorities().contains(new SimpleGrantedAuthority(Role.ADMIN.name()));
    }

    public static boolean isExternalAdmin(UserDetails userDetails) {
        return userDetails.getAuthorities().contains(new SimpleGrantedAuthority(Role.EXTERNAL_ADMIN.name()));
    }

    public static boolean isUser(UserDetails userDetails) {
        return userDetails.getAuthorities().contains(new SimpleGrantedAuthority(Role.USER.name()));
    }

    public static boolean hasRights(UserDetails sender, UserDetails user) {
        if (sender.getUsername().equals(user.getUsername())) {
            return true;
        }
        else if ((isAdmin(sender) && !isAdmin(user)) || (isExternalAdmin(sender) && isUser(user))) {
            return true;
        }
        return false;
    }

    public static boolean hasRights(UserDetails sender) {
        if (isAdmin(sender) || isExternalAdmin(sender)) {
            return true;
        }
        return false;
    }

}
