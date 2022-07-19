const express = require("express");
const {

    searchMovies,
    searchbyTitle, addMovie, updateMovieData, deleteMovie
} = require("../handlers/movie");

const movieRouter = express.Router();


movieRouter.get("/movies", searchMovies);
movieRouter.get("/movies/:title", searchbyTitle);
movieRouter.post('/movies', addMovie);
movieRouter.patch('/movies/:id', updateMovieData);
movieRouter.delete('/movies/:id', deleteMovie);

module.exports = movieRouter;
