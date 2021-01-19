module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todo", {
/*    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },*/
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
    fav: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  },{
    timestamps: true,
    createdAt: "createTime",
    updatedAt: 'updateTime'
  });

  return Todo;
};
