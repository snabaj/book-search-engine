# GraphQL Google Books Search Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node-%3E%3D14-brightgreen.svg)](https://nodejs.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-ApolloServer-ff69b4.svg)](https://www.apollographql.com/)
[![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue.svg)](https://www.mongodb.com/mern-stack)

[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-%2300cf4b.svg?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![Express](https://img.shields.io/badge/Express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A.svg?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

## Description

This project is a fully functioning Google Books search engine that was originally built with a RESTful API and has been refactored to use GraphQL with Apollo Server. The app is built on the MERN stack:
- **MongoDB** for the database
- **Express.js** and **Node.js** for the back-end server
- **React** for the front-end user interface

Key features include:
- **Search**: Query the Google Books API for books.
- **Save Books**: Users can save their favorite book searches to the back end.
- **Authentication**: Secure sign up and login with authentication middleware adapted for GraphQL.
- **GraphQL API**: All data fetching and mutations are now handled via GraphQL queries and mutations, replacing the legacy RESTful API.

## Features

- **GraphQL Powered API**: Uses Apollo Server to execute queries and mutations.
- **User Authentication**: Modified middleware to support GraphQL authentication.
- **Apollo Provider Integration**: The React front-end is wrapped in an Apollo Provider so that all requests communicate seamlessly with the Apollo Server.
- **MERN Stack**: Built using MongoDB, Express.js, React, and Node.js.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/snabaj/book-search-engine.git
   cd book-search-engine

2. Install dependencies:
   ```
   npm install
   ```
3. Build the project:
   ```
   npm run build
   ```
4. Start the development server:
   ```
   npm run develop
   ```
## Usage
- **Searching for Books:**
  
  Use the search functionality on the front end to query the Google Books API. Results will display with an option to save them to your account.

- **User Signup/Login:**
  
  Create an account or log in using the provided forms. Once authenticated, you can save your favorite books.

- **Saving & Removing Books:**
  
  Use the intuitive UI to save books to your profile or remove them as needed. All operations are handled through GraphQL mutations.

### Preview images of the deployed application.

### Search for book

### Sign up/login

### Saved books

### 🚀 **[Try the live Book Search Engine on Render](https://REPLACE-rv08.onrender.com)**

### Project Structure

- **`server`**
 
  Contains the Node.js/Express server configured with Apollo Server for GraphQL.

    - `models` – MongoDB models.
    - `resolvers` – GraphQL resolvers for Query and Mutation operations.
    - `typeDefs` – GraphQL schema definitions.
    - `auth.js` – Authentication middleware modified for GraphQL.
  
- **`client`**
    
    Contains the React front end.

    - `src/components` – React components (e.g., `SearchBooks.tsx`, `SavedBooks.tsx`, `SignupForm.tsx`, `LoginForm.tsx`).
    - `src/utils` – GraphQL queries and mutations.
    - `src/utils` – Utility functions including authentication, API calls, and local storage helpers.

## Contributing

Contributions are welcome! If you’d like to improve this project, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```
   git checkout -b feature/your-feature
   ```
3. Make your changes and commit:
    ```
    git commit -m "Add feature: description"
    ```
4. Push the branch:
   ```
   git push origin feature/your-feature
   ```
5. Open a pull request.

Please ensure your code is well-documented and tested before submitting.

## License
This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.

## Tests

There are no specific tests currently included in this project, but you can add your own testing frameworks or unit tests as necessary.

## Questions

Please contact me with any questions you may have at [snabajja@gmail.com](mailto:snabajja@gmail.com) or visit my GitHub profile at [snabaj](https://github.com/snabaj).