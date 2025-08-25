const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Book = require('./model/Book');
const bookRoutes = require('./routes/bookRoutes');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/books', bookRoutes);


// get routes
app.get('/', (req, res) => {
  res.send('Nomiin delguuriin API ajilj bn');
});

//Tur zuuriin data oruulah
app.get('/test-add-book', async (req, res) => {
    try {
        const newbook = new Book({
            title: 'Money Master',
            author: 'John Doe',
            year: 2021,
        });
        const savedBook = await newbook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).send('Nom oruulakhad aldaa garlaa');
    }
});
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB holbolt amjilttai');
        app.listen(PORT, () => {
        console.log(`http://localhost:${PORT} Server ene port deer ajillaj baina`);
        });
    })
    .catch((err) => {
        console.error('MongoDB holbogdoj ehleegui:', err);
    }); 