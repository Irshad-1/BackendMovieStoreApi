const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  Poster_Link: String,
  Series_Title: { type: String, required: [true, "Series_Title should be provided"] },
  Released_Year: { type: Number, required: [true, "Released year should be provided"] },
  Certificate: String,
  Genre: String,
  IMDB_Rating: { type: Number, required: [true, "IMDB_Rating should be provided"] },
  Overview: String,
  Director: String,
});

const Movie = mongoose.model("movieInfo", movieSchema);

module.exports = Movie;
