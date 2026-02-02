package com.hamid.techtales.service;

import com.hamid.techtales.model.Post;
import com.hamid.techtales.model.User;
import com.hamid.techtales.model.dto.AuthorResponseDTO;
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
                        new AuthorResponseDTO(
                                post.getAuthor().getId(),
                                post.getAuthor().getUsername()
                        )
                )).toList();
    }

    public PostResponseDTO newPost(@RequestBody PostRequestDTO requestDTO) {
        String currentUsername = SecurityContextHolder.getContext()
                .getAuthentication().getName();

        Post post = new Post();
        post.setTitle(requestDTO.title());
        post.setContent(requestDTO.content());
        post.setAuthor(userRepo.findByUsername(currentUsername).get());

        Post savedPost = postRepo.save(post);

        return new PostResponseDTO(
                savedPost.getTitle(),
                savedPost.getContent(),
                new AuthorResponseDTO(savedPost.getAuthor().getId(), savedPost.getAuthor().getUsername())
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
        return postRepo.findAllPostsByAuthorId(id);
    }

    public List<Post> getAdminPosts() {
        return postRepo.findAll();
    }
}
