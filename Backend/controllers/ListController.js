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

    const lists = await List.find(query);
    res.json(lists);

  } catch (error) {
    res.status(500).json({ error: "Error al obtener listas" });
  }
}

export async function createList(req,res,next){
//private
}
export async function getListById(req,res,next){
//public
}
export async function deleteList(req,res,next){
//private
}
export async function updateList(req,res,next){
//private
}