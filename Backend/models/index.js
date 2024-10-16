import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importando os modelos usando a sintaxe de importação
import userModel from "./user.model.js";
import appointmentModel from "./appointment.model.js";

db.user = userModel(sequelize, Sequelize);
db.appointment = appointmentModel(sequelize, Sequelize);

db.user.hasMany(db.appointment, { foreignKey: "userId" });
db.appointment.belongsTo(db.user, { foreignKey: "userId" });

export default db;