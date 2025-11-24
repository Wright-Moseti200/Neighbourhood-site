🏡 Neighbourhood Watch App

A full-stack JavaScript web application that keeps residents informed about what is happening in their neighbourhood. The application allows users to join a specific neighbourhood, view local businesses, find emergency contact information, and share posts or alerts with their neighbours.

✨ Features

Authentication System: User sign-up and login functionality.

Neighbourhood Management: Users can select and join their specific residential area.

Business Directory: Browse local businesses and services within the neighbourhood.

Emergency Contacts: Quick access to police, ambulance, and fire department contacts.

Community Feed: Residents can share updates, alerts, and news on a community board.

Search: Filter businesses and posts by keywords.

User Profile: Manage contact details and profile location.

🛠️ Tech Stack

Frontend: React.js / HTML5 & CSS3

Backend: Node.js & Express.js

Database: MongoDB (NoSQL)

Styling: Tailwind CSS / Bootstrap

Authentication: JSON Web Tokens (JWT)

📂 Project Structure

Neighbourhood-site/
├── backend/             # Server-side logic (Node/Express)
│   ├── models/          # Database Schemas (User, Business, Post)
│   ├── routes/          # API Routes
│   ├── controllers/     # Request handlers
│   └── server.js        # Entry point for backend
├── frontend/            # Client-side logic (React/JS)
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # App pages (Home, Profile, Feed)
│   │   └── App.js       # Main Frontend Component
│   └── package.json     # Frontend dependencies
├── package.json         # Root configuration
└── README.md            # Documentation


🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

Prerequisites

Node.js (v14 or higher)

MongoDB (Installed locally or using Atlas)

npm or yarn

Installation

Clone the repository:

git clone [https://github.com/Wright-Moseti200/Neighbourhood-site.git](https://github.com/Wright-Moseti200/Neighbourhood-site.git)
cd Neighbourhood-site


Install Backend Dependencies:
Navigate to the backend folder (or root if combined):

cd backend
npm install


Install Frontend Dependencies:
Open a new terminal and navigate to the frontend folder:

cd ../frontend
npm install


Environment Variables:
Create a .env file in the backend directory with the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


Run the Application:

Start Backend:

# Inside backend/
npm start


Start Frontend:

# Inside frontend/
npm start


The application should now be running at http://localhost:3000 (Frontend) and http://localhost:5000 (Backend).

📡 API Endpoints (Example)

Method

Endpoint

Description

GET

/api/hoods

List all neighbourhoods

POST

/api/auth/register

Register a new user

GET

/api/businesses

Get businesses in user's hood

POST

/api/posts

Create a new community post

📸 Screenshots

(Add screenshots of your application here)

Home Feed

Business List





🤝 Contributing

Contributions are welcome!

Fork the repository.

Create a feature branch (git checkout -b feature/NewFeature).

Commit your changes.

Push to the branch.

Open a Pull Request.

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

Developed by Wright-Moseti200
