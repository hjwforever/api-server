module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING,
      default: 'https://s3.ax1x.com/2020/12/30/rq3lmF.png'
    }
  },{
    timestamps: true,
    createdAt: "createTime",
    updatedAt: 'updateTime'
  });

  return User;
};
