package com.amir.backend.service;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import com.amir.backend.model.UserDTO;

import java.util.Optional;


/**
 * Service implementation for user-related operations
 */
@Service
public class UserServiceImpl implements UserService {

    public UserDTO getCurrentUser(OidcUser oidcUser, OAuth2AuthenticationToken authenticationToken) {
        
        // retrieve the name 
        String name = Optional.ofNullable(oidcUser)
                .map(OidcUser::getName)
                .orElse("N/A");

        // retrieve the email
        String email = Optional.ofNullable(oidcUser)
                .map(OidcUser::getEmail)
                .orElse("N/A");

        // retrieve the provider 
        String provider = Optional.ofNullable(authenticationToken)
                .map(OAuth2AuthenticationToken::getAuthorizedClientRegistrationId)
                .orElse("N/A");

        return UserDTO.builder()
                .name(name)
                .email(email)
                .provider(provider)
                .build();
    }
}
