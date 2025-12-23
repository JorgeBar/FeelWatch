import Movie from "../models/movie.js";



export async function getMovieById(req, res, next) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    res.json(movie);
  } catch (error) {
    next(error);
  }
}

export async function createMovie(req, res, next) {
  try {
    const { name, director, date, genre, imageCarousel, imagePoster } =
      req.body;

    //TO DO  validaciones

    //se crea una instancia en memoria de la movie
    const movie = new Movie({
      name,
      description,
      director,
      date,
      genre,
      imageCarousel,
      imagePoster,
      owner: req.session.userId,
      list: req.params.listId
    });

    //se guarda en la bd
    await movie.save();
    //enviamos el json y supongo que volveremos mmm a la creacion de la lista me hace sentido
  } catch (error) {
    next(error);
  }
}

export async function updateMovie(req,res,next) {
     try {
      const userId = req.session.userId; //nosotros con wl jwt?
      const movieId = req.params.movieId;
    
      // validar que el elmento que queremos borrar es propiedad del user logueado
      const movie = await Movie.findOne({ _id: movieId });
      // verificar que existe
      if (!movie) {
        console.warn
        (`WARNING - el usuario ${userId} está intentando elminar una película inexistente :${movieId}`);
        return res.status(404).json({ error: "Película no encontrada" });
      }
      if (movie.owner.toString() !== userId) {
        console.warn
        (`WARNING - el usuario ${userId} está intentando elminar una película de otro usuario:${movieId}`);
        return res.status(403).json({ error: "No autorizado" });
    
      }
      await Movie.updateOne({ _id: movieId });
    
      res.json({ message: "Película eliminada correctamente" });
    } catch (error) {
        next(error)
    }
}

export async function deleteMovie(req, res, next) {

  try {
      const userId = req.session.userId; //nosotros con wl jwt?
      const movieId = req.params.movieId;
    
      // validar que el elmento que queremos borrar es propiedad del user logueado
      const movie = await Movie.findOne({ _id: movieId });
      // verificar que existe
      if (!movie) {
        console.warn
        (`WARNING - el usuario ${userId} está intentando elminar una película inexistente :${movieId}`);
        return res.status(404).json({ error: "Película no encontrada" });
      }
      if (movie.owner.toString() !== userId) {
        console.warn
        (`WARNING - el usuario ${userId} está intentando elminar una película de otro usuario:${movieId}`);
        return res.status(403).json({ error: "No autorizado" });
    
      }
      await Movie.deleteOne({ _id: movieId });
    
      res.json({ message: "Película eliminada correctamente" });
    } catch (error) {
        next(error)
    }
    
    
  }
