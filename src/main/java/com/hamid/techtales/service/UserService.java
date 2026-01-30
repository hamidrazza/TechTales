package com.hamid.techtales.service;

import com.hamid.techtales.model.User;
import com.hamid.techtales.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public String register(User user){
        User user1 = userRepo.save(user);
        return (user1 == null) ? "Failed, Try Again..." : "Successfully Registered";
    }

    public String login(User user) {
        
    }
}
