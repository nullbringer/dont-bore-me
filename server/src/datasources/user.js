const { DataSource } = require('apollo-datasource');
const Sequelize = require('sequelize');


class UserAPI extends DataSource {
  constructor() {
    super();
    this.store = createStore();
  }


async createUser({ userId }) {
    const user = await this.store.users.create({ userId: userId,activity: "Check"} );
    console.log(user);

    return user; 
  }  

  
}


const createStore = () => {
  const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    logging: false,
    storage: './.store.sqlite',
    operatorsAliases: false,
  });

  const CREATE_USER_QUERY = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    createdAt DATETIME,
    updatedAt DATETIME,
    userId TEXT,
    activity TEXT
  )`;

  sequelize.query(CREATE_USER_QUERY);

  const users = sequelize.define('user', {
    userId: Sequelize.STRING,
    activity: Sequelize.STRING,
  });

  return { users };
};

module.exports = UserAPI;
