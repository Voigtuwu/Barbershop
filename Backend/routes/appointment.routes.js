import { Router } from "express";
import db from "../models/index.js";
import { authenticateToken, authorize } from "../middleware/auth.js";
const router = Router();

router.post(
  "/",
  authenticateToken,
  authorize(["user", "admin"]),
  async (req, res) => {
    const { date, service } = req.body;

    if (!req.user.id) {
      return res.status(400).json({ message: "ID do usuário não encontrado." });
    }

    try {
      const appointment = await db.appointment.create({
        date,
        service,
        userId: req.user.id,
      });
      res.status(201).json(appointment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
);

router.get(
  "/",
  authenticateToken,
  authorize(["user", "admin", "barber"]),
  async (req, res) => {
    try {
      let appointments;
      if (req.user.role === "admin") {
        appointments = await db.appointment.findAll({ include: db.user });
      } else {
        appointments = await db.appointment.findAll({
          where: { userId: req.user.id },
        });
      }
      res.json(appointments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.put(
  "/:id",
  authenticateToken,
  authorize(["admin", "barber"]),
  async (req, res) => {
    const { id } = req.params;
    const { date, service } = req.body;

    try {
      const appointment = await db.appointment.findByPk(id);
      if (!appointment)
        return res.status(404).json({ message: "Agendamento não encontrado" });

      appointment.date = date || appointment.date;
      appointment.service = service || appointment.service;
      await appointment.save();

      res.json(appointment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.delete(
  "/:id",
  authenticateToken,
  authorize("admin"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const appointment = await db.appointment.findByPk(id);
      if (!appointment)
        return res.status(404).json({ message: "Agendamento não encontrado" });

      await appointment.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
