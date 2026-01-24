import Movie from "../models/movie.js";
import List from "../models/list.js";
import { publishResizePoster,publishResizeCarousel  } from '../lib/publisher.js';


export async function getMovieById(req, res, next) {
  try {
    const movie = await Movie.findById(req.params.id).populate(
      "owner",
      "username"
    );
    if (!movie) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    res.json(movie);
  } catch (error) {
    next(error);
  }
}

export async function getCreateMovie(req, res, next) {
  console.warn("[AUTH] Request sin token");
  res.json({ message: "Gettin form Create Movie" });
}

export async function createMovie(req, res, next) {
  try {
    const { name, director, synopsis, description, date } = req.body;
    const imageCarousel = req.files?.carousel?.[0].path || null;
    const imagePoster = req.files?.poster?.[0].path || null;

    const listId = req.params.id;
    const userId = req.apiUserId;

    if (!userId) {
      return res.status(401).json({ error: "No autorizado" });
    }
    const list = await List.findOne({ _id: listId, owner: userId });

    if (!list) {
      return res.status(404).json({ error: "Lista no encontrada" });
    }
    // 1. Buscar template
    let template = await Movie.findOne({
      name,
      director,
      date,
      isTemplate: true,
    });

    if (!template) {
      template = new Movie({
        name,
        director,
        synopsis,
        description,
        date,
        imageCarousel,
        imagePoster,
        owner: null,
        isTemplate: true,
      });
    publishResizeCarousel(userId, req.files.carousel[0].filename)
    publishResizePoster(userId, req.files.poster[0].filename)


      await template.save();
    }
    const existingCopy = await Movie.findOne({
      name,
      list: listId,
      owner: userId,
      isTemplate: false,
    });

    if (existingCopy) {
      return res
        .status(400)
        .json({ error: "Ya tienes esta película en la lista" });
    }

    const movieCopy = new Movie({
      name,
      director,
      synopsis,
      description,
      date,
      imageCarousel,
      imagePoster,
      owner: userId,
      isTemplate: false,
      list: listId,
    });

    await movieCopy.save();

    // 4. Añadir la copia a la lista
    await List.findByIdAndUpdate(listId, { $push: { movies: movieCopy._id } });

    res.status(201).json({
      message: "Película creada correctamente",
      movieId: movieCopy._id,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateMovie(req, res, next) {
  try {
    const { name, description } = req.body;
    const movieId = req.params.movieId;
    const listId = req.params.id;
    const userId = req.apiUserId;

    // BUSCAR LA PELÍCULA QUE QUEREMOS EDITAR
    const movie = await Movie.findOne({
      _id: movieId,
      list: listId,
      owner: userId,
      isTemplate: false,
    });

    if (!movie) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    if (movie.owner.toString() !== userId) {
      console.warn(
        `WARNING - el usuario ${userId} está intentando editar una película de otro usuario:${movieId}`
      );
      return res.status(403).json({ error: "No autorizado" });
    }
    const updateData = {};
    if (description !== undefined) updateData.description = description;

    if (name && name !== movie.name) {
      //envio el nombre por el post. Y si existe el campo y no coincide con el movie.name antiguo entonces se hará la modificación
      const duplicate = await Movie.findOne({
        name,
        list: listId,
        owner: userId,
        isTemplate: false,
        _id: { $ne: movieId }, //ne = not equal. Nos aseguramos de que en nuestra lista. A la hora de poner el nombre nuevo ,éste no esté en otras películas.
      });

      if (duplicate) {
        return res.status(400).json({
          error: "Ya tienes una película con ese nombre en esta lista",
        });
      }

      updateData.name = name;
    }

    await Movie.updateOne({ _id: movieId }, updateData);

    res.json({ message: "Película actualizada correctamente" });
  } catch (error) {
    next(error);
  }
}

export async function deleteMovie(req, res, next) {
  try {
    const movieId = req.params.movieId;
    const listId = req.params.id;
    const userId = req.apiUserId;

    // validar que el elmento que queremos borrar es propiedad del user logueado
    const movie = await Movie.findOne({
      _id: movieId,
      list: listId,
      owner: userId,
      isTemplate: false,
    });
    // verificar que existe

    if (!movie) {
      console.warn(
        `WARNING - el usuario ${userId} está intentando elminar una película inexistente :${movieId}`
      );
      return res.status(404).json({ error: "Película no encontrada" });
    }
    if (movie.owner.toString() !== userId) {
      console.warn(
        `WARNING - el usuario ${userId} está intentando editar una película de otro usuario:${listId}`
      );
      return res.status(403).json({ error: "No autorizado" });
    }

    await Movie.deleteOne({ _id: movieId });

    await List.findByIdAndUpdate(listId, { $pull: { movies: movieId } });

    res.json({ message: "Película eliminada correctamente" });
  } catch (error) {
    next(error);
  }
}
