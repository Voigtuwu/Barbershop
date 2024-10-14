import express, { json } from "express";
import { config } from "dotenv";
import db from "./models/index.js"; // Altere para importar o db corretamente
import authRoutes from "./routes/auth.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";

config();

const app = express();

app.use(json());

db.sequelize
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

app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
