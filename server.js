const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://ksakthi9604:%23shakthi960@shakthi.payb5.mongodb.net/?retryWrites=true&w=majority&appName=shakthi';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define a schema and model for Votes
const voteSchema = new mongoose.Schema({
    cinematographer: String,
    vfx: String,
    supporting_female: String,
    supporting_male: String,
    comedy_actor: String,
    lyric_writer: String,
    playback_female: String,
    playback_male: String,
    music_director: String,
    best_film: String,
    best_director: String,
    favorite_director: String,
    entertainer: String,
    negative_role: String,
    best_actor: String,
    best_actress: String,
    fav_actress: String,
    fav_actor: String
});

const Vote = mongoose.model('Vote', voteSchema);

// Route to handle vote submissions
app.post('/api/vote', async (req, res) => {
    const voteData = req.body;

    try {
        const newVote = new Vote(voteData);
        await newVote.save();
        res.status(201).json({ message: 'Vote saved successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving vote', error: err });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});