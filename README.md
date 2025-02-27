# Modish Apparel - E-commerce Clothing Store

A modern, responsive e-commerce clothing store built with Next.js and PHP. Features product listings, category filtering, search functionality, and shopping cart management.

![Modish Apparel Screenshot](https://i.imgur.com/STHEm10.png)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)

## Features

- **Responsive Design** - Optimized for all screen sizes
- **Product Catalog** - Browse and search products
- **Category Filtering** - Filter products by category
- **Search Functionality** - Find products easily
- **Shopping Cart** - Add, remove, and update quantities
- **Modern UI/UX** - Smooth animations and transitions
- **Dark/Light Mode** - Adapts to user preferences

## Tech Stack

### Frontend
- **Next.js** - React framework for server-side rendering and static generation
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Poppins Font** - Primary typography

### Backend
- **PHP** - Server-side scripting
- **Appwrite** - Backend as a Service for authentication and database
- **MySQL** - Database (via Appwrite)

## Prerequisites

- Node.js 18.x or later
- PHP 8.0 or later
- Composer
- MySQL (optional if using Appwrite Cloud)
- Git

## Installation

### Clone the Repository
```bash
git clone https://github.com/yourusername/modish-apparel.git
cd modish-apparel
```

#### Frontend installation
```bash
cd clothing-shop-frontend
npm install
```

#### Backend Installation
```bash
cd ../clothing-shop-backend
composer install
```
Configuration
#### Frontend Configuration
```
- Create a .env.local file in the clothing-shop-frontend directory and add the following line of code in it:
NEXT_PUBLIC_API_URL=http://localhost:3000
```

- Update the NEXT_PUBLIC_API_URL to point to your backend API server


#### Backend Configuration
```
Create a .env file in the clothing-shop-backend directory and add the following lines of code in it:
```
# Since the app is on appwrite: 
```
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT=your_project_id
APPWRITE_API_KEY=your_api_key
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_COLLECTION_ID=your_collection_id
```
2. Configure your database settings or Appwrite credentials

## Running the Application
### Start the Backend Server
```bash
cd clothing-shop-backend
php -S localhost:3000 -t .
```
### Start the Frontend Development Server
```bash
cd clothing-shop-frontend
npm run dev
```
### Your application will be available at:
```
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
```
## Contributing
```
1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request
```
<hr>
Developed with love by <b>@yungjoky</b>
