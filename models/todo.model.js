module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("todo", {
/*    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },*/
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    }
  },{
    timestamps: true,
    createdAt: "createTime",
    updatedAt: 'updateTime'
  });

  return Todo;
};
