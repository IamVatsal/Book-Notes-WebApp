# 📚 Book Notes WebApp

A simple and efficient web application for managing book notes, allowing users to store and organize their reading insights effectively.

## 🌍 Live Demo

The application is live at: [Book Notes WebApp](https://book-notes-webapp.onrender.com/)

## 🚀 Features

This application provides a range of features to help users efficiently manage their book notes. Here are some key highlights:

- 📖 Add, edit, and delete book notes
- 🔍 Search and filter notes
- 📂 Categorize notes by book title or genre
- 🎨 Clean and responsive UI
- 🌐 Built using modern web technologies
- 📅 Sort books by title, rating, or finish date
- 👥 User authentication with Google OAuth and local strategy

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Frameworks/Libraries:** Bootstrap, Passport.js

## 📂 Project Structure

```
Book-Notes-WebApp/
├── public/          # Static assets (CSS, JS, images)
├── views/           # Frontend templates (EJS)
├── routes/          # API routes
├── controller/      # Business logic
├── .vscode/         # VSCode settings
├── .env             # Environment variables
├── .gitignore       # Git ignore file
├── db.js            # Database connection
├── index.js         # Main server entry point
├── package.json     # Dependencies and scripts
├── queries.sql      # SQL queries for database setup
└── README.md        # Project documentation
```

## 🎯 Installation & Setup

### Prerequisites

- Install [Node.js](https://nodejs.org/)
- Install [PostgreSQL](https://www.postgresql.org/)

### Steps

These steps cover both setting up the repository and initializing the PostgreSQL database.

1. **Clone the repository:**
   ```sh
   git clone https://github.com/IamVatsal/Book-Notes-WebApp.git
   ```
2. **Navigate to the project folder:**
   ```sh
   cd Book-Notes-WebApp
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Set up environment variables:**
   ```sh
   cp .env.example .env
   # Update .env file with necessary details
   ```

### Database Initialization

1. **Access the PostgreSQL shell:**
   ```sh
   psql -U your_username -d your_database
   ```
2. **Create the `book_details` table:**
   ```sql
   CREATE TABLE book_details (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     isbn TEXT NOT NULL,
     olid TEXT NOT NULL,
     authorName TEXT NOT NULL,
     genre TEXT NOT NULL,
     userName TEXT NOT NULL,
     finishDate DATE NOT NULL,
     rating INTEGER NOT NULL,
     isPublic BOOLEAN DEFAULT FALSE,
     summary TEXT NOT NULL
   );
   ```

3. **Insert sample data:**
   ```sql
   INSERT INTO book_details (title, isbn, olid, authorName, genre, userName, finishDate, rating, isPublic, summary)
   VALUES (
     'Harry Potter and the Philosopher''s Stone',
     '9780590353403',
     'OL48118497M',
     'J.K. Rowling',
     'Fiction',
     'Vatsal',
     '2021-06-01',
     5,
     TRUE,
     'It was a great book.'
   );
   ```

4. **Start the server:**
   ```sh
   npm start
   ```
5. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## 📌 Usage

1. Add new book notes with title, content, and category
2. Search and filter through saved notes
3. Edit or delete notes when needed
4. Sort books by title, rating, or finish date
5. Authenticate using Google OAuth or local strategy

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to your fork (`git push origin feature-branch`)
5. Create a pull request

## 🛡️ License

This project is licensed under the MIT License.

## 📞 Contact

For any queries or feedback, feel free to reach out:

- GitHub: [IamVatsal](https://github.com/IamVatsal)
- Email: [vatsalpatel0609@gmail.com](mailto:vatsalpatel0609@gmail.com)

---

Made with ❤️ by [IamVatsal](https://github.com/IamVatsal)

