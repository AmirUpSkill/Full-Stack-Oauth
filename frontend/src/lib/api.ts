/**
 * Defines the structure of the User Data Transfer Object (DTO)
 * expected from the backend's /api/user/me endpoint.
 */
export interface UserDTO {
    name: string; // User's full name
    email: string; // User's email address
    provider: string; // The OAuth provider used (e.g., "google")
    // Add other fields like id or picture if your backend provides them
    // id?: string;
    // picture?: string;
  }
  
  // It's best practice to use an environment variable for the backend URL
  // Make sure to create a .env.local file in your project root with:
  // NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
  
  /**
   * Fetches the currently authenticated user's data from the backend.
   * Relies on the browser sending the session cookie automatically.
   *
   * @returns A Promise that resolves to the UserDTO if authenticated, or null otherwise.
   */
  export const fetchCurrentUser = async (): Promise<UserDTO | null> => {
    const apiUrl = `${BACKEND_URL}/api/user/me`;
    console.log(`Attempting to fetch user from: ${apiUrl}`); // For debugging
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json', // Explicitly accept JSON
        },
        // Crucial: Include credentials (like cookies) in the request
        credentials: 'include',
      });
  
      console.log(`Response status from ${apiUrl}: ${response.status}`); // For debugging
  
      if (response.ok) { // Status was 200-299
        try {
          const user: UserDTO = await response.json();
          console.log('Successfully fetched user:', user); // For debugging
          return user;
        } catch (jsonError) {
          console.error(`Error parsing JSON response from ${apiUrl}:`, jsonError);
          return null; // Response was OK, but body wasn't valid JSON
        }
      } else if (response.status === 401) {
        // 401 Unauthorized specifically means the user is not logged in
        console.log(`User is not authenticated (received 401 from ${apiUrl}).`);
        return null;
      } else {
        // Handle other non-successful statuses (e.g., 403 Forbidden, 500 Server Error)
        console.error(`Failed to fetch user from ${apiUrl}. Status: ${response.status}`);
        return null;
      }
    } catch (error) {
      // Handle network errors or other issues with the fetch call itself
      console.error(`Network or other error fetching user from ${apiUrl}:`, error);
      return null;
    }
  };
  
  // Optional: Add the logout function here as well, based on the spec
  /**
   * Sends a request to the backend to log the user out.
   * @returns A Promise that resolves to true if the logout request was likely successful, false otherwise.
   */
  export const logoutUser = async (): Promise<boolean> => {
      const logoutUrl = `${BACKEND_URL}/logout`;
      console.log(`Attempting logout via POST to: ${logoutUrl}`); // For debugging
  
      try {
          const response = await fetch(logoutUrl, {
              method: 'POST',
              credentials: 'include', // Send cookies
               headers: {
                   // Spring Security might require CSRF token if not configured otherwise,
                   // but often standard logout doesn't strictly need it if cookie-based.
                   // If needed, you'd fetch the token first and add 'X-CSRF-TOKEN': token
                   'Accept': '*/*', // Accept anything, backend likely redirects or sends minimal response
               },
          });
  
          console.log(`Logout response status: ${response.status}`); // For debugging
  
          // Spring Security logout typically redirects (e.g., 302) or returns 200/204 on success.
          // It might return 401 if the user wasn't logged in to begin with.
          // For simplicity, we'll consider any status < 400 as potentially successful
          // because the main goal is invalidating the backend session.
          if (response.ok || response.status === 302) {
               console.log('Logout request sent successfully.');
               // Note: The frontend doesn't usually get direct confirmation beyond a successful request.
               // The cookie *should* be cleared by the backend's response headers.
              return true;
          } else {
              console.error(`Logout request failed. Status: ${response.status}`);
              return false;
          }
      } catch (error) {
          console.error(`Network or other error during logout:`, error);
          return false;
      }
  };