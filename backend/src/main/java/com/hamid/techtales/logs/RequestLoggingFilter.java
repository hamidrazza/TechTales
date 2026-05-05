package com.hamid.techtales.logs;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        long startTime = System.currentTimeMillis();
        String method = request.getMethod();
        String path = request.getRequestURI();
        String query = request.getQueryString();
        String clientIp = request.getRemoteAddr();

        try {
            filterChain.doFilter(request, response);
        } finally {
            long durationMs = System.currentTimeMillis() - startTime;
            int status = response.getStatus();
            String username = resolveUsername();

            if (query != null && !query.isBlank()) {
                log.info("HTTP {} {}?{} -> {} in {} ms | user={} | ip={}",
                        method, path, query, status, durationMs, username, clientIp);
            } else {
                log.info("HTTP {} {} -> {} in {} ms | user={} | ip={}",
                        method, path, status, durationMs, username, clientIp);
            }
        }
    }

    private String resolveUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return "anonymous";
        }
        String name = authentication.getName();
        if (name == null || name.isBlank() || "anonymousUser".equalsIgnoreCase(name)) {
            return "anonymous";
        }
        return name;
    }
}
