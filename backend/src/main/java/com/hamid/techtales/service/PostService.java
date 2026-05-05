package com.hamid.techtales.service;

import com.hamid.techtales.model.Post;
import com.hamid.techtales.model.User;
import com.hamid.techtales.model.dto.PostRequestDTO;
import com.hamid.techtales.model.dto.PostResponseDTO;
import com.hamid.techtales.repo.PostRepo;
import com.hamid.techtales.repo.UserRepo;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.List;

@Service
public class PostService {

    private final PostRepo postRepo;
    private final UserRepo userRepo;

    public PostService(PostRepo postRepo, UserRepo userRepo) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
    }

    @Transactional(readOnly = true)
    public List<PostResponseDTO> getPosts() {
        return postRepo.findAllByOrderByUpdatedAtDesc().stream()
                .map(this::toPostResponse)
                .toList();
    }

    @Transactional
    public PostResponseDTO newPost(PostRequestDTO requestDTO) {
        String currentUsername = SecurityContextHolder.getContext()
                .getAuthentication().getName();

        User user = userRepo.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found..!!"));

        Post post = new Post();
        post.setTitle(requestDTO.title());
        post.setContent(requestDTO.content());
        post.setAuthor(user);

        try {
            Post savedPost = postRepo.save(post);
            return toPostResponse(savedPost);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Post title already exists", ex);
        }
    }

    @Transactional
    public PostResponseDTO updatePost(Integer id, PostRequestDTO requestDTO) {
        Post post = postRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));

        String currentUsername = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        User user = userRepo.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found..!!"));

        if (!Objects.equals(post.getAuthor().getId(), user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only update your own post");
        }

        post.setTitle(requestDTO.title());
        post.setContent(requestDTO.content());
        Post savedPost = postRepo.save(post);

        return toPostResponse(savedPost);
    }

    @Transactional(readOnly = true)
    public PostResponseDTO getPostById(Integer id){
        Post foundedPost = postRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));

        return toPostResponse(foundedPost);
    }

    @Transactional(readOnly = true)
    public List<PostResponseDTO> getAdminPosts() {
        return postRepo.findAllByOrderByUpdatedAtDesc().stream()
                .map(this::toPostResponse)
                .toList();
    }

    private PostResponseDTO toPostResponse(Post post) {
        return new PostResponseDTO(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getCreatedAt(),
                post.getUpdatedAt(),
                post.getAuthor().getName()
        );
    }

    @Transactional
    public void deletePost(Integer id) {
        Post post = postRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));

        String currentUsername = SecurityContextHolder.getContext()
                .getAuthentication().getName();

        User user = userRepo.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found..!!"));

        if(!Objects.equals(post.getAuthor().getId(), user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only delete your own post");
        }

        postRepo.delete(post);
    }
}
