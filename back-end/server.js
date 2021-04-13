const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/journal', {
  useNewUrlParser: true
});

// Create a scheme for journal entries
const entrySchema = new mongoose.Schema({
  id: Number,
  title: String,
  text: String,
  date: String,
  image: String,
});

// Create a model for journal entries
const Entry = mongoose.model('Entry', entrySchema);

// Create a new journal entry
app.post('/api/entries', async (req, res) => {
  const entry = new Entry({
    id: req.body.id,
    title: req.body.title,
    text: req.body.text,
    date: req.body.date,
    image: req.body.image,
  });
  try {
    await entry.save();
    res.send(entry);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the journal entries
app.get('/api/entries', async (req, res) => {
  try {
    let entries = await Entry.find();
    res.send(entries);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Delete an entry.
app.delete('/api/entries/:id', async (req, res) => {
  try {
    await Entry.deleteOne({
      id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Edit an entry.
app.put('/api/entries/:id', async (req, res) => {
  try {
    let entry = await Entry.findOne({
      id: req.params.id
    });
    entry.title = req.body.title;
    entry.text = req.body.text;
    entry.date = req.body.date;
    entry.image = req.body.image
    entry.save();
    // res.send(entry);
    res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
