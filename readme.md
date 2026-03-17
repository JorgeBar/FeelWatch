# FeelWatch

A full-stack movie recommendation platform where users can create and share emotion-based movie lists.

## 🎯 About The Project

FeelWatch helps users discover movies based on how they're feeling. Instead of browsing by genre, users create curated lists organized by emotions and moods - from "Last Movies That Made Me Cry" to "Always Ready to Watch Again."

**Live Demo:** [https://feelwatch.netlify.app/](https://enchanting-froyo-d3e826.netlify.app)

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express
- MongoDB (Mongoose ODM)
- JWT Authentication
- Multer (image upload)
- RabbitMQ (image processing queue)
- MongoDB Atlas (cloud database)

**Frontend:**
- Vanilla JavaScript (MVC architecture)
- HTML5 & CSS3
- Dynamic carousels with scroll functionality

**Deployment:**
- Backend: Render
- Frontend: Netlify
- Database: MongoDB Atlas
- Message Queue: CloudAMQP

## ✨ Current Features

- **User Authentication:** Secure registration and login with JWT
- **List Management:** Create, edit, and delete movie lists
- **Movie Management:** Add movies to lists with images and details
- **Dynamic Carousels:** Browse lists in Netflix-style scrollable carousels
- **Image Upload:** Upload poster and carousel images for movies
- **Owner Permissions:** Only list owners can edit/delete their content
- **Session Management:** Dynamic UI based on authentication status

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- RabbitMQ (optional, for image processing)

### Installation

1. Clone the repository
```bash
git clone https://github.com/JorgeBar/FeelWatch.git
cd FeelWatch
```

2. Install backend dependencies
```bash
cd Backend
npm install
```

3. Create `.env` file in Backend directory
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RABBITMQ_BROKER_URL=your_rabbitmq_url
```

4. Initialize database with sample data
```bash
npm run initDB
```

5. Start the development server
```bash
npm run dev
```

6. Open `docs/index.html` with a live server

## 📋 Known Limitations & Future Improvements

**In Progress:**
- Movie detail pages
- List detail pages
- Mobile responsive design
- Improved form styling

**Planned Features:**
- User profiles
- Search functionality
- Sort and filter options
- Password reset flow
- Email notifications
- Skeleton loaders
- "Where to Watch" integration
- Pagination for lists

## 🤝 Contributing

This is a personal learning project, but feedback and suggestions are welcome!

## 📧 Contact

Jorge Barroso Galindo - https://www.linkedin.com/in/jorge-vicente-barroso-galindo/ - barrosogalindojorge@gmail.com

Project Link: [https://github.com/JorgeBar/FeelWatch](https://github.com/JorgeBar/FeelWatch)