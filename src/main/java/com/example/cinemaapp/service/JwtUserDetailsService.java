package com.example.cinemaapp.service;

import com.example.cinemaapp.model.SysUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SysUser user = userService.findUserByLogin(username);
        List<SimpleGrantedAuthority> authoritiesList;

        if (user.getLogin().equals(username)) {
            if(Objects.equals(user.getUserRole().toLowerCase(), "admin")){
                authoritiesList = Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
            } else {
                authoritiesList = Collections.emptyList();
            }
            return new org.springframework.security.core.userdetails.User(
                    user.getLogin(),
                    user.getPass(),
                    authoritiesList);
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

}