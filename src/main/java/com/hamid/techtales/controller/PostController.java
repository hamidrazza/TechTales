package com.hamid.techtales.controller;

import com.hamid.techtales.model.Post;
import com.hamid.techtales.model.dto.PostRequestDTO;
import com.hamid.techtales.model.dto.PostResponseDTO;
import com.hamid.techtales.service.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping({"/home","/posts"})
    public List<PostResponseDTO> posts(){
        return postService.getPosts();
    }

    @PostMapping("newPost")
    public ResponseEntity<?> newPost(@Valid @RequestBody PostRequestDTO requestDTO){
        PostResponseDTO response = postService.newPost(requestDTO);

//        if (result.hasErrors()){
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(result.getFieldError().getDefaultMessage());
//        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("updatePost")
    public String updatePost(@RequestBody Post post){

        Post updatedPost = postService.updatePost(post);
        return (updatedPost == null) ? "Post Invalid" : "Updated Successfully...";
    }

    @GetMapping("/posts/{id}")
    public PostResponseDTO getAllPostById(@PathVariable Integer id){
        return postService.getPostById(id);
    }
}
