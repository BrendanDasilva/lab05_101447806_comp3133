const Movie = require("./models/Movie");

const resolvers = {
  Query: {
    getAllMovies: async () => {
      return await Movie.find();
    },
    getMovieById: async (_, { id }) => {
      return await Movie.findOne({ id });
    },
  },

  Mutation: {
    addMovie: async (
      _,
      { id, name, director_name, production_house, release_date, rating }
    ) => {
      const newMovie = new Movie({
        id,
        name,
        director_name,
        production_house,
        release_date,
        rating,
      });
      return await newMovie.save();
    },

    updateMovie: async (
      _,
      { id, name, director_name, production_house, release_date, rating }
    ) => {
      return await Movie.findOneAndUpdate(
        { id },
        { name, director_name, production_house, release_date, rating },
        { new: true }
      );
    },

    deleteMovie: async (_, { id }) => {
      const movie = await Movie.findOneAndDelete({ id });
      return movie ? "Movie deleted successfully!" : "Movie not found!";
    },
  },
};

module.exports = resolvers;
