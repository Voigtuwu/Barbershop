export default (sequelize, Sequelize) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      service: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "appointments",
    }
  );

  return Appointment;
};
