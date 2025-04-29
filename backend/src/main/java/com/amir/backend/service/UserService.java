package com.amir.backend.service;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import com.amir.backend.model.UserDTO;

/**
 * Service interface for managing user-related operations.
 * This interface provides methods to handle user authentication and information retrieval
 * using OAuth2 and OpenID Connect protocols.
 */
public interface UserService {

    /**
     * Retrieves the current authenticated user's information.
     *
     * @param oidcUser The OpenID Connect user containing identity information
     * @param authenticationToken The OAuth2 authentication token containing authentication details
     * @return UserDTO containing the current user's information
     */
    UserDTO getCurrentUser(OidcUser oidcUser, OAuth2AuthenticationToken authenticationToken);

}
