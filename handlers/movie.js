const { findByIdAndDelete } = require("../database/movie");
const Movie = require("../database/movie");

async function addMovie(req, res, next) {
  try {

    let movie = new Movie();
    try {
      await movie.save();
      return res.status(201).send("Movie Data added successfully");
    } catch (error) {
      if (error.name === "ValidationError") {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });

        return res.status(400).send(errors);


      }
    }

  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).send(errors);

    }

  }
}




async function searchMovies(req, res, next) {
  try {
    let { q, page, limit, sort, field, filterbyimdb } = req.query;
    let movieData;

    if (!page) {
      page = 0;
    }
    else {
      page = page - 1;
    }
    if (!limit) {
      limit = 10;
    }
    if (filterbyimdb) {
      if (q && sort && field) {
        q = "^" + q;
        movieData = await Movie.find({
          Series_Title: { $regex: q, $options: "i" }, IMDB_Rating: Number(filterbyimdb)
        }).skip(page * limit).limit(limit).sort({ [field]: sort });
      }
      else if (q) {
        q = "^" + q;
        movieData = await Movie.find({
          Series_Title: { $regex: q, $options: "i" }, IMDB_Rating: Number(filterbyimdb)
        }).skip(page * limit).limit(limit);
      }
      else if (sort && field) {
        movieData = await Movie.find({ IMDB_Rating: Number(filterbyimdb) }).skip(page * limit).limit(limit).sort({ [field]: sort });
      }
      else {
        movieData = await Movie.find({ IMDB_Rating: Number(filterbyimdb) }).skip(page * limit).limit(limit);
      }
    }
    else {
      if (q && sort && field) {
        q = "^" + q;
        movieData = await Movie.find({
          Series_Title: { $regex: q, $options: "i" },
        }).skip(page * limit).limit(limit).sort({ [field]: sort });
      }
      else if (q) {
        q = "^" + q;
        movieData = await Movie.find({
          Series_Title: { $regex: q, $options: "i" },
        }).skip(page * limit).limit(limit);
      }
      else if (sort && field) {
        movieData = await Movie.find({}).skip(page * limit).limit(limit).sort({ [field]: sort });
      }
      else {
        movieData = await Movie.find({}).skip(page * limit).limit(limit);
      }
    }
    return res.send({
      data: movieData,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function searchbyTitle(req, res, next) {
  try {
    let { title } = req.params;

    const movieData = await Movie.find({
      Series_Title: { $regex: new RegExp("^" + title + "$", "i") },
    });
    return res.send({
      data: movieData,
    });
  } catch (error) {
    throw error;
  }
}
async function updateMovieData(req, res, next) {
  try {
    console.log("Hello");
    let movie = await Movie.findById(req.params.id);

    if (!movie)
      return res.status(404).send('The movie with the given ID was not found.');
    console.log(req.body);
    for (let key in req.body) {
      if (movie[key]) {
        movie[key] = req.body[key];
      }
    }
    const updatedMovie = await Movie.findByIdAndUpdate({ _id: req.params.id }, movie);
    console.log(movie);
    res.status(200).send("Updated successfully");

  } catch (error) {
    console.log(error);
  }

}
async function deleteMovie(req, res, next) {

  try {
    const resp = await Movie.findByIdAndDelete(req.params.id);

    if (resp)
      res.status(200).send("Deleted successfully");
    else
      res.status(404).send('The movie with the given ID was not found.');
  } catch (error) {
    throw error;
  }
}
module.exports = {
  searchMovies,
  searchbyTitle,
  addMovie, updateMovieData, deleteMovie
};
