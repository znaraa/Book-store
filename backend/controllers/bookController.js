const Book = require('../model/Book');

const createBook = async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const newBook = new Book({ title, author, year });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Nom harahad aldaa garlaa', error });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, year } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, year }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Nom oldsongui ' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Dotood serveriin aldaa garlaa', error });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Nom oldsongui ' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Dotood serveriin aldaa garlaa', error });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook
};