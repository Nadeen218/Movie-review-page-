require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Basic configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'assets'))); // Serve static files from 'assets' directory

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Review Model
const reviewSchema = new mongoose.Schema({
  username: { type: String, required: true },
  movieTitle: { type: String, required: true },
  releaseYear: { 
    type: Number, 
    required: true,
    min: 1900,
    max: new Date().getFullYear()
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now }
});
const Review = mongoose.model('Review', reviewSchema);

// Routes
app.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ dateAdded: -1 });
    res.render('review', { 
      reviews,
      currentYear: new Date().getFullYear(),
      message: req.query.message
    });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).send('Error loading reviews');
  }
});

app.post('/submit-review', async (req, res) => {
  try {
    const { username, movieTitle, releaseYear, rating, review } = req.body;
    
    await Review.create({
      username,
      movieTitle,
      releaseYear: parseInt(releaseYear),
      rating: parseInt(rating),
      review
    });

    res.redirect('/?message=Thank you for your review! Your submission has been received.');
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).send('Error submitting review');
  }
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
