package com.hamid.techtales.repo;

import com.hamid.techtales.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Integer> {
    List<Post> findAllPostsByAuthorId(Integer id);
}
