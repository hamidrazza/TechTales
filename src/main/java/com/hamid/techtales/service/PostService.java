package com.hamid.techtales.service;

import com.hamid.techtales.model.Post;
import com.hamid.techtales.model.User;
import com.hamid.techtales.model.dto.PostRequestDTO;
import com.hamid.techtales.model.dto.PostResponseDTO;
import com.hamid.techtales.repo.PostRepo;
import com.hamid.techtales.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepo postRepo;
    @Autowired
    private UserRepo userRepo;

    public List<PostResponseDTO> getPosts() {
        return postRepo.findAll().stream()
                .map(post -> new PostResponseDTO(
                        post.getTitle(),
                        post.getContent(),
                        post.getAuthor().getUsername()
                )).toList();
    }

    public PostResponseDTO newPost(@RequestBody PostRequestDTO requestDTO) {
        User user = (User) SecurityContextHolder.getContext()
                .getAuthentication();

        Post post = new Post();

        post.setTitle(requestDTO.title());
        post.setContent(requestDTO.content());
        post.setAuthor(user);

        Post savedPost = postRepo.save(post);

        return new PostResponseDTO(
                savedPost.getTitle(),
                savedPost.getContent(),
                savedPost.getAuthor().getUsername()
        );
    }

    public Post updatePost(Post post) {
        Post oldPost = postRepo.findById(post.getId()).get();

        oldPost.setTitle(post.getTitle());
        oldPost.setContent(post.getContent());

        return postRepo.save(post);
    }

    public List<Post> getAllPostById(Integer id) {
        User user = userRepo.findUserById(id);
        return postRepo.findPostById(id);
    }

    public List<Post> getPostById(Integer id){
        return postRepo.findPostById(id);
    }

    public List<Post> getAdminPosts() {
        return postRepo.findAll();
    }
}
