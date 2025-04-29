
# Full Stack OAuth 2.0 Authentication POC

## Project Goal

This repository contains the code for a Proof-of-Concept (POC) project demonstrating a full-stack authentication system using OAuth 2.0. The primary goal was to build a custom authentication backend using the Spring ecosystem, integrate it with a Next.js frontend, and leverage Redis for session management, starting with Google as the initial OAuth provider. This project serves as an exploration and potential replacement for third-party authentication services like Clerk within the context of an internship at Proxym.

## Key Features & Flow

- **Backend:** Spring Boot application handling the OAuth 2.0 Authorization Code Grant flow.
- **Frontend:** Next.js application providing the user interface.
- **Authentication Provider:** Google (Initial implementation). ClickUp integration is planned.
- **Session Management:** Configured to use Redis (via Docker Compose for local dev), although final verification of session storage in Redis is pending troubleshooting.
- **User Flow:**
  1. User lands on a SaaS-like Landing Page (`/`).
  2. Header shows "Sign In" / "Sign Up" buttons.
  3. Clicking either button navigates to the frontend Login Page (`/login`).
  4. Login page displays a "Sign In with Google" button.
  5. Clicking the Google button redirects to the backend (`/oauth2/authorization/google`), which initiates the standard Google OAuth flow.
  6. After successful Google authentication, Google redirects to the backend callback (`/login/oauth2/code/google`).
  7. Backend validates the callback, creates a session (intended for Redis), and redirects the browser to the frontend Home Page (`/home`).
  8. Frontend detects the session (via API call), displays authenticated user details (`Hello, {Name}!`), and updates the header (shows user name and Logout button).
  9. Logout button triggers backend logout (`/logout`), invalidates the session, and redirects to the frontend Landing Page.

## Technology Stack

### Backend (`/backend`)

- **Framework:** Spring Boot 3.4.4
- **Language:** Java 21
- **Security:** Spring Security (OAuth2 Client, Web Security)
- **Build Tool:** Maven
- **Session Store:** Redis (via Spring Session Data Redis)
- **Database (Session):** Redis (running via Docker Compose locally)
- **Dev Utilities:** Lombok

### Frontend (`/frontend`)

- **Framework:** Next.js 15.3.1 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Package Manager:** pnpm
- **State Management:** React Context API (`UserProvider`, `useUser`)

## Project Structure

```
Full-Stack-Oauth/
├── backend/              # Spring Boot Application
│   ├── src/
│   ├── pom.xml
│   └── docker-compose.yml # For running Redis locally
├── frontend/             # Next.js Application
│   ├── src/
│   ├── public/
│   └── package.json
├── .gitignore            # Root gitignore for both projects
└── README.md             # This file
```

## Setup & Installation

**Prerequisites:**

- Java JDK 21 or later
- Apache Maven
- Node.js (check `.nvmrc` or use latest LTS) and pnpm
- Docker Desktop (for running Redis)
- Git

**1. Clone the Repository:**

```bash
git clone https://github.com/YourUsername/Full-Stack-Oauth.git # Replace with your repo URL
cd Full-Stack-Oauth
```

**2. Backend Setup:**

- **Google Credentials:** You need to obtain OAuth 2.0 Client ID and Client Secret from Google Cloud Console.
  - Create/Select a project.
  - Configure the OAuth Consent Screen (add your email as a test user).
  - Create OAuth 2.0 Client ID credentials for a "Web application".
  - Set the Authorized redirect URI to: `http://localhost:8080/login/oauth2/code/google`
- **Configure Credentials:** Create the file `backend/src/main/resources/application.yml`. (This file is gitignored for security). Populate it with your credentials and Redis config (see example below, replace placeholders):

```yaml
# Server configuration
server:
  port: 8080

# Spring application configuration
spring:
  application:
    name: backend
  session:
    store-type: redis
    redis:
      serialization: jackson # Recommended
      flush-mode: ON_SAVE
  data:
    redis:
      host: localhost
      port: 6379
      # password: your-redis-password # If you set one in docker-compose
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: YOUR_GOOGLE_CLIENT_ID
            client-secret: YOUR_GOOGLE_CLIENT_SECRET
            scope:
              - openid
              - profile
              - email
# Logging
logging:
  level:
    # Set desired levels
    org.springframework.session: DEBUG 
    org.springframework.data.redis: DEBUG
    com.amir.backend: DEBUG
```

- **Build Backend:** (Optional, but good practice)

```bash
cd backend
mvn clean package 
cd ..
```

**3. Frontend Setup:**

- **Install Dependencies:**

```bash
cd frontend
pnpm install
```

- **Environment Variables:** Create a file `.env.local` in the `frontend/` directory:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

- **Return to root:**

```bash
cd ..
```

## Running the Application

**1. Start Redis:** Open a terminal in the `backend/` directory:

```bash
docker-compose up -d
```

- Verify it's running: `docker ps` (should show `proxym-auth-redis`).

**2. Start Backend:** Open another terminal in the `backend/` directory:

```bash
# Option 1: Using Maven plugin
mvn spring-boot:run 
# Option 2: Running the JAR (if you built it)
# java -jar target/backend-*.jar
```

- Watch for successful startup and connection messages (especially regarding Redis if troubleshooting).

**3. Start Frontend:** Open a third terminal in the `frontend/` directory:

```bash
pnpm dev
```

**4. Access Application:** Open your browser and navigate to `http://localhost:3000`.

## Current Status (as of 2025-04-29)

- **Backend:**
  - Google OAuth2 login flow implemented and working.
  - `/api/user/me` endpoint correctly returns authenticated user data.
  - CORS configured for frontend interaction.
  - Service layer implemented.
  - Dependencies and configuration for Redis sessions added.
- **Frontend:**
  - Project setup complete (Next.js, TS, Tailwind, Shadcn).
  - Landing page, Login page, Header, and Authenticated Home page components created.
  - Authentication state management via Context API implemented.
  - API integration for user fetching and logout working.
  - Multi-step login flow implemented.
- **Known Issues / Pending:**
  - **Redis Session Verification:** Despite configurations appearing correct and startup logs showing `RedisHttpSessionConfiguration` matching, sessions are not being stored in Redis (`redis-cli` shows empty keys). Further troubleshooting needed. The application currently falls back to in-memory sessions.

## Next Steps

- Resolve Redis Session Issue: Diagnose and fix why sessions aren't being persisted to Redis.
- Add ClickUp Provider: Integrate ClickUp as a second OAuth 2.0 provider on the backend.
- Testing: Implement Unit/Integration tests for the backend (JUnit, Mockito, Spring Boot Test).
- CI/CD Pipeline: Set up a GitHub Actions workflow for automated testing, building, and potentially Docker image creation.
- Frontend Refinement: Improve UI/UX, add loading states, error handling.

## Important Notes

- The backend's `application.yml` file contains sensitive Google credentials and is intentionally excluded from Git via the root `.gitignore` file. Ensure you create this file locally using your own credentials when setting up the project.
- Remember to add your Google account as a "Test User" in the Google Cloud OAuth Consent Screen settings while the app is in testing mode.
