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

export function updateAvatar(req, res, next) {}
