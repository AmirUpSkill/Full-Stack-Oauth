

---

# Full Stack OAuth 2.0 Authentication POC

## Project Goal

This repository contains a Proof-of-Concept (POC) project showcasing a full-stack authentication system built with OAuth 2.0. The aim is to demonstrate a custom authentication backend using the Spring ecosystem, paired with a Next.js frontend, and utilizing Redis for session management. It starts with Google as the OAuth provider, offering a foundation that could be adapted to replace third-party authentication services in various applications.

## Key Features & Flow

- **Backend:** A Spring Boot application managing the OAuth 2.0 Authorization Code Grant flow.
- **Frontend:** A Next.js application serving as the user interface.
- **Authentication Provider:** Google (initial setup), with the potential to add other providers.
- **Session Management:** Configured to use Redis (via Docker Compose locally), though session storage in Redis requires further verification.
- **User Flow:**
  1. Users arrive at a SaaS-style Landing Page (`/`).
  2. The header displays "Sign In" / "Sign Up" options.
  3. Clicking either directs to a Login Page (`/login`).
  4. The Login Page offers a "Sign In with Google" button.
  5. Clicking it routes to the backend (`/oauth2/authorization/google`) to start Google’s OAuth flow.
  6. Post-authentication, Google redirects to the backend callback (`/login/oauth2/code/google`).
  7. The backend validates the callback, establishes a session (intended for Redis), and redirects to the frontend Home Page (`/home`).
  8. The frontend confirms the session via an API call, greets the user (e.g., "Hello, {Name}!"), and updates the header with a Logout option.
  9. Logout triggers the backend (`/logout`), clears the session, and returns to the Landing Page.

## Technology Stack

### Backend (`/backend`)
- **Framework:** Spring Boot 3.4.4
- **Language:** Java 21
- **Security:** Spring Security (OAuth2 Client, Web Security)
- **Build Tool:** Maven
- **Session Store:** Redis (via Spring Session Data Redis)
- **Database (Session):** Redis (running locally via Docker Compose)
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
- Node.js (latest LTS recommended) and pnpm
- Docker Desktop (for Redis)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url> # Replace with your repository URL
cd Full-Stack-Oauth
```

### 2. Backend Setup
- **Google Credentials:** Obtain an OAuth 2.0 Client ID and Client Secret from Google Cloud Console:
  - Create/select a project.
  - Configure the OAuth Consent Screen (add your email as a test user).
  - Generate OAuth 2.0 Client ID credentials for a "Web application".
  - Set the Authorized redirect URI to: `http://localhost:8080/login/oauth2/code/google`
- **Configure Credentials:** Create `backend/src/main/resources/application.yml` (gitignored for security) with the following, replacing placeholders:

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
      serialization: jackson
      flush-mode: ON_SAVE
  data:
    redis:
      host: localhost
      port: 6379
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
    org.springframework.session: DEBUG 
    org.springframework.data.redis: DEBUG
    com.example.backend: DEBUG # Adjust package name as needed
```

- **Build Backend (Optional):**
```bash
cd backend
mvn clean package
cd ..
```

### 3. Frontend Setup
- **Install Dependencies:**
```bash
cd frontend
pnpm install
```
- **Environment Variables:** Create `frontend/.env.local`:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```
- Return to root:
```bash
cd ..
```

## Running the Application

1. **Start Redis:** In `backend/`:
```bash
docker-compose up -d
```
- Check it’s running: `docker ps` (look for a Redis container).

2. **Start Backend:** In `backend/`:
```bash
mvn spring-boot:run
```

3. **Start Frontend:** In `frontend/`:
```bash
pnpm dev
```

4. **Access:** Visit `http://localhost:3000` in your browser.

## Current Status

- **Backend:**
  - Google OAuth2 login flow works.
  - `/api/user/me` endpoint returns user data.
  - CORS configured for frontend.
  - Redis session dependencies set up.
- **Frontend:**
  - Full setup with Next.js, TypeScript, Tailwind, and shadcn/ui.
  - Pages (Landing, Login, Home) and Header built.
  - Authentication state managed via Context API.
  - API integration for user data and logout functional.
- **Pending:**
  - **Redis Issue:** Sessions aren’t persisting in Redis despite configuration; currently uses in-memory sessions.

## Next Steps
- Fix Redis session persistence.
- Add more OAuth providers.
- Implement tests (JUnit, Mockito).
- Set up CI/CD (e.g., GitHub Actions).
- Enhance frontend UI/UX.

## Notes
- The `application.yml` file is gitignored for security—create it locally with your credentials.
- Add your email as a "Test User" in Google’s OAuth Consent Screen during testing.

---
