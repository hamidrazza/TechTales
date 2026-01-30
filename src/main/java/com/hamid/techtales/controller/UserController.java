package com.hamid.techtales.controller;

import com.hamid.techtales.model.User;
import com.hamid.techtales.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    private Object user;

    @PostMapping("register")
    public String register(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping("login")
    public String login(@RequestBody User user){
        return userService.login(user);
    }
}
