import List from '../models/list.js'

export async function getLists(req, res) {
  try {
    let query = {};

    if (req.query.owner === 'me') {
      if (!req.session.userId) {
        return res.status(401).json({ error: "No autorizado" });
      }
      query.owner = req.session.userId;
    }

    const lists = await List
    .find(query)
    .populate('movies');
    res.json(lists);

  } catch (error) {
    res.status(500).json({ error: "Error al obtener listas" });
  }
}

export async function createList(req,res,next){
//private
    try {
        const {name,description,date,owner,movies} = req.body;

        const list = new List ({
           name,
           description,
           date,
           owner,
           movies
        });

        await list.save();
        res.status(201).json({ message: "Lista creada", list });

    } catch (error) {
        next(error)
    }
}
export async function getListById(req,res,next){
//public
try {
    const list = await List
    .findById(req.params.listId)
    .populate('movies', 'name imagePoster');
    if (!list) {
        return res.status(404).json({error:"Lista no encontrada"});
    }
    res.json(list);

} catch (error) {
    next(error)
}
}
export async function updateList(req,res,next){
    try {
      const userId = req.session.userId;
      const listId = req.params.listId;

      const list = await List.findOne({_id: listId})
      if(!list) {
         console.warn
        (`WARNING - el usuario ${userId} está intentando editar una lista inexistente :${listId}`);
        return res.status(404).json({ error: "Lista no encontrada" });
      }
      if (list.owner.toString() !== userId) {
        console.warn
        (`WARNING - el usuario ${userId} está intentando editar una lista de otro usuario:${listId}`);
        return res.status(403).json({ error: "No autorizado" });
      }
      await List.updateOne({_id:listId}, {name: req.body.name, description: req.body.description})
      res.json({message: "Lista editada"})
    } catch (error) {
      next(error)
    }
    }
export async function deleteList(req,res,next){
//private
    try {
       const userId =req.session.userId;
       const listId = req.params.listId;
       
       const list = await List.findOne({ _id: listId});

       if(!list){
        console.warn
         (`WARNING - el usuario ${userId} está intentando elminar una lista inexistente :${listId}`);
        return res.status(404).json({ error: "Lista no encontrada" });
       }
       if (list.owner.toString() !== userId){
        console.warn
          (`WARNING - el usuario ${userId} está intentando elminar una lista de otro usuario:${listId}`);
        return res.status(403).json({ error: "No autorizado" });
       }
       await List.deleteOne({_id: listId});
       res.json({ message: "Lista eliminada correctamente"})
    } catch (error) {
        next(error)
      }
    }
    