const { DataSource } = require('apollo-datasource');
const Sequelize = require('sequelize');

class UserAPI extends DataSource {
  constructor() {
    super();
    this.store = createStore();
  }

  async getUser({ userId }) {
    const userData = await this.store.useractivities.findAll({ where: { userId } });
    return userData;
  }

   async saveUser({ userId, activityKey }) {
    const userData = await this.store.useractivities.find({
      where: {
        userId,
        activityKey,
      },
    });
    if (!userData) await this.store.useractivities.create({ userId, activityKey });
  }

}

const createStore = () => {
  const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    logging: false,
    storage: './.store.sqlite',
    operatorsAliases: false,
  });

  const CREATE_USER_QUERY = `CREATE TABLE IF NOT EXISTS useractivities(
    id INTEGER PRIMARY KEY,
    createdAt DATETIME,
    updatedAt DATETIME,
    userId TEXT,
    activityKey TEXT
  )`;

  sequelize.query(CREATE_USER_QUERY);

  const useractivities = sequelize.define('useractivities', {
    userId: Sequelize.STRING,
    activityKey: Sequelize.STRING,
  });

  return { useractivities };
};

module.exports = UserAPI;