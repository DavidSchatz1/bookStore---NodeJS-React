Happy to share my "Bookstore" project with you all!

TL;DR: React (Frontend), Node.js (Backend), MongoDB (Database).

Frontend (Client-Side) – React:
The application was developed in React, implementing a Single Page Application (SPA) architecture to ensure a fast and smooth user experience. I prioritized advanced development principles:

Global State Management: Utilized Context API combined with useReducer for efficient and distributed global state management, maintaining a clear separation between state logic and UI components.

API Integration: All server communication is handled via asynchronous API requests, with built-in management of loading and error states to provide clear user feedback.

Modularity & Responsiveness: The design adopted a Component-Based Architecture, enabling code reusability. I used SASS for writing modular, responsive, and scalable CSS, adapting seamlessly to various devices and resolutions.

Clean & Readable Code: Implemented Clean Code principles, logical file and folder structuring, and common React design patterns to facilitate future understanding and maintenance of the codebase.

User Interface (UI/UX): Beyond functionality, significant thought was given to User Experience (UX). The interface is user-friendly and intuitive, providing clear visual feedback on user actions, including success, error, and loading states, leveraging information received from the server.

Backend (Server-Side) – Node.js with Express:
The server-side was built with Node.js using Express.js as the framework, emphasizing security, efficiency, and a robust architecture:

Architecture: Implemented full Separation of Concerns, with clear logical division between application layers (Routing, Controllers, Services, Models).

Secure API Management:

User Authentication: Employed JWT (JSON Web Tokens) for secure, stateless session management and user authentication, enhancing API security.

Password Hashing: User passwords are encrypted using Bcrypt with Salting before storage in the database, protecting against brute-force attacks.

Rigorous Validation: All API requests undergo comprehensive server-side validation before processing. This includes checks against database schemas and business logic rules.

Global Error Handling: Implemented Global Error Handling to uniformly capture and manage errors across all server layers, ensuring consistent client responses and efficient error logging.

Database – MongoDB with Mongoose:
Data is stored in MongoDB, and Mongoose was used for interaction with the database.

As part of the project, I've included a short video demonstrating the main functionalities:
https://www.linkedin.com/feed/update/urn:li:activity:7347594333665091584/
