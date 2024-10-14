export default (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: "user_roles",
      foreignKey: "roleId",
      otherKey: "userId",
    });
  };

  return Role;
};
