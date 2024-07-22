const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bank', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  });

  export default sequelize;