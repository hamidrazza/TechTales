package com.hamid.techtales.controller;

import com.hamid.techtales.model.Post;
import com.hamid.techtales.model.dto.PostRequestDTO;
import com.hamid.techtales.model.dto.PostResponseDTO;
import com.hamid.techtales.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping({"home","posts"})
    public List<PostResponseDTO> posts(){
        return postService.getPosts();
    }

    @PostMapping("newPost")
    public ResponseEntity<PostResponseDTO> newPost(@Valid @RequestBody PostRequestDTO requestDTO){
        PostResponseDTO response = postService.newPost(requestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("updatePost")
    public String updatePost(@RequestBody Post post){
        Post updatedPost = postService.updatePost(post);

        return (updatedPost == null) ? "Post Invalid" : "Updated Successfully...";
    }

    @GetMapping("{id}/posts")
    public List<Post> getAllPostById(@PathVariable Integer id){
        return postService.getAllPostById(id);
    }

    @GetMapping("/admin/posts")
    public List<Post> getAllPosts(){
        return postService.getAdminPosts();
    }
}
