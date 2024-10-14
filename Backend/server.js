import express, { json } from "express";
import { config } from "dotenv";
import { sequelize } from "./models";
import authRoutes from "./routes/auth.routes";
import appointmentRoutes from "./routes/appointment.routes";

config();

const app = express();

app.use(json());

sequelize
  .sync()
  .then(() => {
    console.log("Conectado ao banco de dados.");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo ao sistema da barbearia!" });
});

// Rotas
app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
