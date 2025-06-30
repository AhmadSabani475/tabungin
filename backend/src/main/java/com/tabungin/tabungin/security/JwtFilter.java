package com.tabungin.tabungin.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;

@Component
public class JwtFilter implements Filter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpReq = (HttpServletRequest) request;
        HttpServletResponse httpRes = (HttpServletResponse) response;
        String path = httpReq.getRequestURI();

        // Allow paths without authentication
        if (path.startsWith("/api/auth") ||
                path.startsWith("/swagger-ui") ||
                path.startsWith("/v3/api-docs") ||
                path.startsWith("/webjars") ||
                path.equals("/swagger-ui.html")) {
            chain.doFilter(request, response);
            return;
        }

        // Ambil Authorization header
        String authHeader = httpReq.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);

            if (jwtUtil.validateToken(jwt)) {
                String username = jwtUtil.extractUsername(jwt);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpReq));
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        // Lanjutkan filter meskipun tidak ada token (biarkan @PreAuthorize / @Secured handle)
        chain.doFilter(request, response);
    }


}