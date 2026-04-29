package com.hamid.techtales.controller;

import com.hamid.techtales.model.dto.PostRequestDTO;
import com.hamid.techtales.model.dto.PostResponseDTO;
import com.hamid.techtales.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping({"/home","/posts"})
    public List<PostResponseDTO> posts(){
        return postService.getPosts();
    }

    @PostMapping("/newPost")
    public ResponseEntity<?> newPost(@Valid @RequestBody PostRequestDTO requestDTO){
        PostResponseDTO response = postService.newPost(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/updatePost")
    public ResponseEntity<PostResponseDTO> updatePost(@Valid @RequestBody PostRequestDTO requestDTO){
        PostResponseDTO updatedPost = postService.updatePost(requestDTO);
        return ResponseEntity.ok(updatedPost);
    }

    @GetMapping("/posts/{id}")
    public PostResponseDTO getPostById(@PathVariable Integer id){
        return postService.getPostById(id);
    }
}
