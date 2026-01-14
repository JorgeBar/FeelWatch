import List from "../models/list.js";
import Movie from "../models/movie.js";
import { normalizeTag } from "../lib/normalizeTag.js";

export async function getLists(req, res) {
  try {
    let query = {};

    if (req.query.owner === "me") {
      if (!req.session.userId) {
        return res.status(401).json({ error: "No autorizado" });
      }
      query.owner = req.session.userId;
    }
    // Filtro por tag
    if (req.query.tags) {
      query.tags = normalizeTag(req.query.tags);
    }

    // Búsqueda por nombre
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }
    //paginación
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;

    //total count paginagicón
    const total = await List.countDocuments(query);

    //sort options
    let sortOptions = {};

    if (req.query.sort === "name-asc") {
      sortOptions = { name: 1 };
    } else if (req.query.sort === "name-desc") {
      sortOptions = { name: -1 };
    } else {
      sortOptions = { createdAt: -1 };
    }

    const lists = await List.find(query)
      .populate("movies", "name imagePoster")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // calcular paginas
    const page = Math.floor(skip / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    res.json({
      lists,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener listas" });
  }
}

export async function getCreateList(req, res, next) {
  console.warn("[AUTH] Request sin token");
  res.json({ message: "Getting form Create List" });
}
export async function createList(req, res, next) {
  //private
  try {
    const { name, description, date, tags } = req.body;
    const userId = req.apiUserId;

    if (!userId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const list = new List({
      name,
      description,
      date,
      owner: userId,
      tags: tags ? tags.map(normalizeTag) : [],
      movies: [],
    });

    await list.save();
    res.status(201).json({ message: "Lista creada", list });
  } catch (error) {
    next(error);
  }
}
export async function getListById(req, res, next) {
  //public
  try {
    const listId = req.params.id;
    //total count paginagicón
    const total = await Movie.countDocuments({list: listId, isTemplate: false});

    //sort options
    const sortMovies = req.query.sortMovies === 'name-desc' ? -1 : 1;
    const skipMovies = parseInt(req.query.skipMovies) || 0;
    const limitMovies = parseInt(req.query.limitMovies) || 20;

    
    const listWithMovies = await List
    .findById(req.params.id)
    .populate({
      path: "movies",
      select: "name imagePoster ",
      options: {
        sort: {name: sortMovies},
        skip: skipMovies,
        limit: limitMovies
      },
      match: req.query.searchMovies ? { name: { $regex: req.query.searchMovies, $options: 'i' } } : {},
     
    });
    // calcular paginas
    const page = Math.floor(skipMovies / limitMovies) + 1;
    const totalPages = Math.ceil(total / limitMovies);
    if (!listWithMovies) {
      return res.status(404).json({ error: "Lista no encontrada" });
    }
    res.json({
      list: listWithMovies,
      total,
      page,
      totalPages
    });
  } catch (error) {
    next(error);
  }
}
export async function updateList(req, res, next) {
  try {
    const userId = req.apiUserId;
    const listId = req.params.id;

    const list = await List.findOne({ _id: listId });
    if (!list) {
      console.warn(
        `WARNING - el usuario ${userId} está intentando editar una lista inexistente :${listId}`
      );
      return res.status(404).json({ error: "Lista no encontrada" });
    }
    if (list.owner.toString() !== userId) {
      console.warn(
        `WARNING - el usuario ${userId} está intentando editar una lista de otro usuario:${listId}`
      );
      return res.status(403).json({ error: "No autorizado" });
    }

    await List.updateOne(
      { _id: listId },
      { name: req.body.name, description: req.body.description }
    );
    res.json({ message: "Lista editada" });
  } catch (error) {
    next(error);
  }
}
export async function deleteList(req, res, next) {
  //private
  try {
    const userId = req.apiUserId;
    const listId = req.params.id;

    const list = await List.findOne({ _id: listId });

    if (!list) {
      console.warn(
        `WARNING - el usuario ${userId} está intentando elminar una lista inexistente :${listId}`
      );
      return res.status(404).json({ error: "Lista no encontrada" });
    }
    if (list.owner.toString() !== userId) {
      console.warn(
        `WARNING - el usuario ${userId} está intentando elminar una lista de otro usuario:${listId}`
      );
      return res.status(403).json({ error: "No autorizado" });
    }

    await Movie.deleteMany({ list: listId, owner: userId });

    await List.deleteOne({ _id: listId });
    res.json({ message: "Lista y películas eliminadas correctamente" });
  } catch (error) {
    next(error);
  }
}
