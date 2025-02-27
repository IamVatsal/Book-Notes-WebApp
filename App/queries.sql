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

INSERT INTO book_details (title, isbn, olid, authorName, genre, userName, finishDate, rating, isPublic, summary) 
VALUES ('Harry Potter and the Philosopher''s Stone', '9780590353403', 'OL48118497M', 'J. K. Rowling', 'Fiction', 'Vatsal', '2021-06-01', 5, 't' , 'It was Great Book');

SELECT id, title, isbn, olid, authorName, genre, TO_CHAR(finishDate, 'DD/MM/YYYY') AS finishDate, rating, summary FROM book_details;