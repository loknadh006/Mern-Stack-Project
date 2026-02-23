# MERN Stack Project

A full-stack web application built with **MongoDB**, **Express.js**, **React**, and **Node.js** (MERN stack).

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Build Tools**: Vite, ESLint

## Features

- User authentication (login/signup)
- Product management (CRUD operations)
- Responsive UI with React components
- Private routes protection
- Input sanitization for security
- MongoDB integration with Mongoose models

## Project Structure

```
mern-stack-project/
├── backend/                    # Node.js/Express server
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controller/           # Business logic
│   │   ├── auth.controller.js
│   │   └── product.controller.js
│   ├── middleware/           # Custom middleware
│   │   └── auth.middleware.js
│   ├── models/               # Mongoose schemas
│   │   ├── user.js
│   │   └── products.model.js
│   ├── routes/               # API endpoints
│   │   ├── auth.routes.js
│   │   └── products.routes.js
│   ├── utils/
│   │   └── sanitize.js
│   ├── scripts/
│   │   └── deleteUser.js
│   ├── server.js             # Express server entry point
│   └── package.json
│
├── Frontend/                  # React + Vite application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── productCard.jsx
│   │   ├── Pages/            # Page components
│   │   │   ├── Homepage.jsx
│   │   │   ├── Loginpage.jsx
│   │   │   └── CreatePage.jsx
│   │   ├── store/            # State management
│   │   │   └── product.js
│   │   ├── utils/            # Utility functions
│   │   │   └── auth.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
│
├── .env                      # Environment variables (not in repo)
├── .env.example              # Template for environment variables
├── .gitignore                # Git ignore rules
└── package.json              # Root package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (use `.env.example` as template):
```bash
MONGODB_URI=your_mongodb_connection_string_here
MONGODB_PORT=27017
```

4. Start the backend server:
```bash
npm start
```
The server will run on `http://localhost:5000` (or your configured port)

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file if needed for API endpoints

4. Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
MONGODB_PORT=27017
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
PORT=5000
```

### Frontend (.env if needed)
```
VITE_API_URL=http://localhost:5000
```

## Available Scripts

### Backend
- `npm start` - Start the server
- `npm run dev` - Start with nodemon (auto-restart on changes)

### Frontend
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Product Routes (`/api/products`)
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (authenticated)
- `PUT /api/products/:id` - Update product (authenticated)
- `DELETE /api/products/:id` - Delete product (authenticated)

## Security Features

- JWT token-based authentication
- Input sanitization to prevent injection attacks
- Password hashing (recommended: bcryptjs)
- Protected routes that require authentication
- Environment variables for sensitive data

## Getting Started for Contributors

1. Clone the repository:
```bash
git clone https://github.com/loknadh006/Mern-Stack-Project.git
```

2. Install dependencies for both backend and frontend (follow setup instructions above)

3. Create `.env` files in root and `backend/` directories

4. Start the backend and frontend servers

5. Open `http://localhost:5173` in your browser

## Troubleshooting

### MongoDB Connection Issues
- Verify your connection string in `.env`
- Check MongoDB Atlas IP whitelist
- Ensure database credentials are correct

### Port Already in Use
- Change the port in server configuration
- Or kill the process using the port

### Frontend can't connect to Backend
- Check CORS configuration in Express server
- Verify backend URL in frontend API calls
- Ensure backend server is running

## Future Enhancements

- Add unit and integration tests
- Implement error handling and logging
- Add pagination for products
- Implement product search and filters
- Add user profile management
- Deploy to cloud (Heroku, Vercel, AWS, etc.)

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues or questions, please create an issue on the GitHub repository.

---

**Happy Coding!** 🚀
