Pet Journal
Project Overview

Pet Journal is a full-stack web application that allows users to create, manage, and organize personal records for their pets. The application provides a secure and user-friendly platform where pet owners can track health information, important events, and daily updates in one centralized place.

Purpose

The purpose of Pet Journal is to help pet owners maintain structured and organized records about their pets’ lives. Whether tracking vaccinations, allergies, medications, behavioral notes, or training progress, the application offers a reliable digital solution for managing pet care information efficiently.

Project Data Models

User (Owner) Model:
Name
Email
Password (hashed)
List of owned pets

Pet Model:
Name
Species/Breed
Birth date
Photo
Basic details
Reference to owner
List of health notes

Health Note Model:
Title
Description
Category (vaccination, allergy, medication, deworming, etc.)
Date
Reference to pet

Features

Authentication & Security
User registration and login
JWT-based authentication
Protected routes to ensure users can only access their own data

Pet Management
Add, edit, and delete pets
Upload and display pet photos
View detailed pet profiles with basic information

Health Notes Management
Create, edit, and delete health notes
Categorize notes (vaccination, allergy, medication, etc.)
View all notes associated with a specific pet

User Experience
Clean and organized dashboard
Responsive layout for different screen sizes
Intuitive navigation

Technologies

Frontend: React, React Router, Axios, CSS/Bootstrap
Backend: Node.js, Express.js
Database: MongoDB with Mongoose
Authentication: JSON Web Tokens (JWT)
Version Control: Git & GitHub