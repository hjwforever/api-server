module.exports = {
    HOST: process.env.cloudserver47_host,
    USER: process.env.cloudserver47_user,
    PASSWORD: process.env.cloudserver47_psd,
    DB: "ali_lesson",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
