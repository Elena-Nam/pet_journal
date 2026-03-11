# Pet Journal

## Overview
Pet Journal is a full-stack web application designed to help pet owners digitally manage and organize essential information about their pets. The platform provides a secure, intuitive interface where users can track medical history, vaccinations, allergies, medications, and other important care-related events in one centralized system.

The application emphasizes clean data organization, secure authentication, and a modern user experience built with a React-based frontend and a RESTful API backend.

## Problem & Solution
Many pet owners rely on paper records, scattered notes, or memory to track important health information. This can lead to missed vaccinations, forgotten treatments, or disorganized medical history.

Pet Journal solves this problem by providing a structured digital system where users can:
- Store pet profiles
- Record categorized health events
- Access organized medical history anytime
- Maintain secure, private access to their data

## Core Features
### Authentication & Security
- JWT-based authentication
- Secure password hashing
- Protected API routes
- User-specific data isolation

### Pet Management
- Create, update, and delete pet profiles
- Upload and display pet photos
- View detailed pet information
- Associate pets with authenticated users

### Health Record Management
- Create categorized health notes (vaccination, allergy, medication, etc.)
- Edit and delete records
- View complete medical history per pet
- Structured data relationships between users, pets, and notes

### User Experience
- Responsive dashboard interface
- Component-based React architecture
- Client-side routing with protected routes
- Clean, organized UI for easy navigation

## Data Architecture
- **User Model** → Owns multiple pets
- **Pet Model** → Belongs to a user and contains multiple health notes
- **Health Note Model** → Linked to a specific pet

This relational structure ensures scalable and maintainable data management using MongoDB and Mongoose.

## Technology Stack
**Frontend:** React, React Router,  CSS  
**Backend:** Node.js, Express.js, RESTful API  
**Database:** MongoDB, Mongoose ODM  
**Authentication:** JSON Web Tokens (JWT)  
**Development & Version Control:** Git, GitHub