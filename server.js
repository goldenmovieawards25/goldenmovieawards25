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
const mongoURI = 'mongodb://localhost:27017/shakthi';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define a schema and model for Contact
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

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

// Route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Message saved successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving message', error: err });
    }
});

// Route to handle vote submissions
app.post('/api/vote', async (req, res) => {
    const {
        cinematographer,
        vfx,
        supporting_female,
        supporting_male,
        comedy_actor,
        lyric_writer,
        playback_female,
        playback_male,
        music_director,
        best_film,
        best_director,
        favorite_director,
        entertainer,
        negative_role,
        best_actor,
        best_actress,
        fav_actress,
        fav_actor
    } = req.body;

    try {
        const newVote = new Vote({
            cinematographer,
            vfx,
            supporting_female,
            supporting_male,
            comedy_actor,
            lyric_writer,
            playback_female,
            playback_male,
            music_director,
            best_film,
            best_director,
            favorite_director,
            entertainer,
            negative_role,
            best_actor,
            best_actress,
            fav_actress,
            fav_actor
        });
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