package com.amir.backend.controller;

import com.amir.backend.model.UserDTO;
import com.amir.backend.service.UserService; // Import the UserService
import org.springframework.http.ResponseEntity; // Import ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// No need for Optional import here anymore

@RestController
@RequestMapping("/api/user")
public class UserController {

    // Declare the dependency on the service interface
    private final UserService userService;

    // Constructor injection: Spring will inject the UserServiceImpl bean here
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Endpoint to get the currently authenticated user's details.
     * Delegates the logic to UserService.
     *
     * @param oidcUser Represents the authenticated user, injected by Spring Security.
     * @param authenticationToken Represents the full authentication object.
     * @return ResponseEntity containing UserDTO and HTTP status.
     */
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal OidcUser oidcUser,
                                                OAuth2AuthenticationToken authenticationToken) {

        // Delegate the call to the service layer
        UserDTO userDTO = userService.getCurrentUser(oidcUser, authenticationToken);

        // Return the DTO wrapped in a ResponseEntity with OK status
        return ResponseEntity.ok(userDTO); // Preferred shortcut
    }
}