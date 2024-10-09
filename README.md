# shva-home-assignment-server

# User Management API

This API provides endpoints to manage user accounts, including registration, login, logout, updating user details, changing passwords, and deleting user accounts. The API uses JWT for authentication and includes validation middleware to ensure data integrity.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Express
- Swagger

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ariel-Git/shva-home-assignment-server.git
   cd user-management-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables.

### Running the Application

To start the server, run:
```bash
npm start
```

The server will be running on `http://localhost:5000`.

## API Documentation

The API is documented using Swagger. To view the documentation, navigate to `http://localhost:5000/api-docs` in your browser.

## Endpoints

### User Management

#### Register a new user
```http
POST /api/users/register
```
- **Request Body:**
  ```json
  {
    "firstname": "string",
    "lastname": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Responses:**
  - `201`: User registered successfully
  - `400`: Bad request
  - `500`: Server error

#### Login a user
```http
POST /api/users/login
```
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Responses:**
  - `200`: User logged in successfully
  - `400`: Bad request
  - `401`: Invalid credentials
  - `500`: Server error

#### Logout a user
```http
POST /api/users/logout
```
- **Responses:**
  - `200`: User logged out successfully

#### Get all users
```http
GET /api/users/
```
- **Responses:**
  - `200`: List of users
  - `400`: Bad request
  - `401`: Unauthorized
  - `500`: Server error

#### Update user details
```http
PUT /api/users/{id}
```
- **Parameters:**
  - `id` (path): The user ID
- **Request Body:**
  ```json
  {
    "firstname": "string",
    "lastname": "string",
    "email": "string"
  }
  ```
- **Responses:**
  - `200`: User updated successfully
  - `400`: Bad request
  - `401`: Unauthorized
  - `406`: Email already in use by other user
  - `500`: Server error

#### Change user password
```http
PUT /api/users/change-password/{id}
```
- **Parameters:**
  - `id` (path): The user ID
- **Request Body:**
  ```json
  {
    "oldPassword": "string",
    "newPassword": "string",
    "confirmPassword": "string"
  }
  ```
- **Responses:**
  - `200`: Password changed successfully
  - `400`: Bad request
  - `401`: Unauthorized
  - `406`: Old password incorrect
  - `500`: Server error

#### Delete a user
```http
DELETE /api/users/{id}
```
- **Parameters:**
  - `id` (path): The user ID
- **Responses:**
  - `200`: User deleted successfully
  - `401`: Unauthorized
  - `500`: Server error

## Middleware

### Validation Middleware
- `validateUserRegistration`
- `validateUserLogin`
- `validateUserUpdate`

### Error Handling Middleware
- `errorHandler`

### Authentication and Authorization Middleware
- `authenticateJWT`
- `authorizeRequest`

## Types
- `JWTPayload`

## License

This project is licensed under the MIT License.

