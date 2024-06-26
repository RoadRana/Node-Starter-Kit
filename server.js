const express = require('express');
const app = express();
// Middleware to parse JSON requests
app.use(express.json());


// Sample movie data
const moviesData = [
  {
    "id": 1,
    "title": "The Godfather",
    "certificate": "18",
    "yearOfRelease": 1972,
    "director": "Francis Ford Coppola",
  },
  {
    "id": 2,
    "title": "The Shawshank Redemption",
    "certificate": "15",
    "yearOfRelease": 1994,
    "director": "Frank Darabont",
  },
  {
    "id": 3,
    "title": "Schindler's List",
    "certificate": "15",
    "yearOfRelease": 1993,
    "director": "Steven Spielberg",
  },
];

function validateMovie(movie){
  const validProperties = ["title", "certificate", "yearOfRelease", "director"];
  console.log(Object.keys(movie));
  for (pro in movie){
    if(!validProperties.includes(pro)){
      throw new Error(`Invalid property  ${pro}`);
  }
  
    
  }
}


// Endpoint to get all movies
app.get("/movies", (req, res) => {
  res.send(moviesData);
});

// Endpoint to get a single movie by ID
app.get("/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId; ///why this code works if i put Number or not
  const movie = moviesData.find(movie => movie.id == movieId); 
  if (movie) {
    res.send(movie);
  } else {
    res.status(404).send("Movie not found");
  }
});

// Endpoint to add a new movie
app.post("/movies", (req, res) => {
    const newMovie = req.body;
    moviesData.push(newMovie);
    res.status(201).send(newMovie);
  });

  app.put("/movies/:movieID", (req, res) => {
    const body = req.body;
    validateMovie(body)
    const movieID = Number(req.params.movieID);
    console.log(`id: ${movieID}`);
    console.log(body);
    const movieIndex = moviesData.findIndex(movie => movie.id == movieID);
    if (movieIndex == -1) {
      res.status(404).send("Movie not found");
    }else{
      body.id = movieID;
      const oldMovie = moviesData[movieIndex];
      moviesData[movieIndex] = body;
      const newMovie = body;
      res.send({"oldMovie": oldMovie,"newMovie": newMovie});
        } 
  });



// Starting the server
const port = 3000; // You can change the port if needed
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

