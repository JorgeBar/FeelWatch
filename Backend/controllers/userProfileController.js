import User from "../models/User.js";

export async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({
      email: user.email,
      username: user.username,
      avatar: user.avatar || "default-avatar.png",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
}

export function updateProfile(req, res, next) {}
// i guess aqui podremos modificar el username ,el name,añadir la direccion si queremos
// poner la foto , la fecha de nacimiento
export function changePassword(req, res, next) {}
// No se si tiene que ir aqui pero deberíamos quizas poder cambiar la contraseña
export async function DeleteAccount(req, res, next) {
  try {
    const userId = req.apiUserId;
    //comprobamos que el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "Usuario no encontrado" });
    }
      await List.deleteMany({owner: userId });

      await Movie.deleteMany({owner: userId, isTemplate: false });

      await User.deleteOne({ _id: userId});
      res.json({ message: "Cuenta eliminada con éxito" });
    }
   catch (error) {
    next(error);
  }
}
