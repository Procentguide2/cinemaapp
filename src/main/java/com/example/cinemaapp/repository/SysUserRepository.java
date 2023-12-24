package com.example.cinemaapp.repository;

import com.example.cinemaapp.model.SysUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SysUserRepository extends JpaRepository<SysUser, Integer> {

    SysUser findByLogin(String login);
}