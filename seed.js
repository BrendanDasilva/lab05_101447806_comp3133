const mongoose = require("mongoose");
const Movie = require("./models/Movie");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // load JSON file
    const movies = JSON.parse(
      fs.readFileSync("./Sample_Movies_Records.json", "utf-8")
    );

    // ensure database is empty before inserting to avoid duplicate IDs
    await Movie.deleteMany({});

    // insert movies into database
    await Movie.insertMany(movies);

    console.log("Movies added successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });
