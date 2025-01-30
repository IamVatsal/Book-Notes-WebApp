CREATE TABLE book_details (
	id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	olid TEXT NOT NULL,
	authorName TEXT NOT NULL,
	genre TEXT NOT NULL,
	finishDate DATE NOT NULL,
	rating INTEGER NOT NULL,
	summary TEXT NOT NULL
);

INSERT INTO book_details (title, olid, authorName, genre, finishDate, rating, summary) 
VALUES ('Harry Potter and the Philosopher''s Stone', 'OL48118497M', 'J. K. Rowling', 'Fiction', '2021-06-01', 5, 'It was Great Book');

SELECT id, title, olid, authorName, genre, TO_CHAR(finishDate, 'DD/MM/YYYY') AS finishDate, rating, summary FROM book_details;