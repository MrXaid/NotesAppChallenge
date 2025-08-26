package com.myproject.Notes.App.controller;

import com.myproject.Notes.App.dto.LoginRequest;
import com.myproject.Notes.App.dto.MessageResponse;
import com.myproject.Notes.App.dto.SignupRequest;
import com.myproject.Notes.App.dto.UserResponse;
import com.myproject.Notes.App.model.User;
import com.myproject.Notes.App.repository.UserRepository;
import com.myproject.Notes.App.security.JwtUtils;
import com.myproject.Notes.App.security.UserPrincipal;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        User user = new User(signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new UserResponse(user.getId(), user.getUsername()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
                                              HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(), loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        Cookie jwtCookie = new Cookie("jwt-token", jwt);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false); // TODO: set true in production (HTTPS)
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(24 * 60 * 60);
        response.addCookie(jwtCookie);

        UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();

        return ResponseEntity.ok(new UserResponse(userDetails.getId(), userDetails.getUsername()));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        Cookie jwtCookie = new Cookie("jwt-token", null);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0);
        response.addCookie(jwtCookie);

        return ResponseEntity.ok(new MessageResponse("Logout successful"));
    }
}
