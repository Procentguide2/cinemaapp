package com.example.cinemaapp.service;

import com.example.cinemaapp.model.RegisterForm;
import com.example.cinemaapp.model.SysUser;
import com.example.cinemaapp.model.User;
import com.example.cinemaapp.repository.SysUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    SysUserRepository sysUserRepository;

    public SysUser findUserByLogin(String login){
        return sysUserRepository.findByLogin(login);
    }

    public void saveUserFromForm(RegisterForm form) throws Exception {
        Optional<SysUser> foundUser = Optional.ofNullable(sysUserRepository.findByLogin(form.getLogin()));
        if (foundUser.isPresent()){
            throw new Exception("email is present");
        }
        SysUser user = new SysUser(form.getLogin(),form.getPassword(),"default");
        sysUserRepository.save(user);
    }
}
