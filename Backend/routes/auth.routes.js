import { Router } from "express";
import { hashSync, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { user as _user } from "../models";
const router = Router();

const generateToken = (user) => {
  return sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = hashSync(password, 8);

  try {
    const existingUser = await _user.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email já está em uso." });
    }

    const user = await _user.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await _user.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ token: null, message: "Senha inválida" });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
