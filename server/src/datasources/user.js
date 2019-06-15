const { DataSource } = require('apollo-datasource');
const Sequelize = require('sequelize');


class UserAPI extends DataSource {
  constructor() {
    super();
    this.store = createStore();
  }


async createUser({ userId }) {
    const dt = await this.store.users.findAll({ where: { userId } } );
    
    if (!dt.length === 0 ) {
      console.log(dt[0].get());
    }else{
      console.log(dt);
    }

    //console.log(dt[0].get())


    return dt;

   
  }

  async updateUser({ userId,activity,accessibility,type,participants,price,key }) {
    const user = await this.store.users.findOrCreate({ where: { userId: userId,activity: activity,accessibility:accessibility
    ,type:type,participants:participants,price:price,key:key } });
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
    activity TEXT,
    accessibility REAL,
    type TEXT,
    participants INTEGER,
    price REAL,
    key TEXT
  )`;

  sequelize.query(CREATE_USER_QUERY);

  const users = sequelize.define('user', {
    userId: Sequelize.STRING,
    activity: Sequelize.STRING,
    accessibility: Sequelize.FLOAT,
    type: Sequelize.TEXT,
    participants: Sequelize.INTEGER,
    price: Sequelize.FLOAT,
    key: Sequelize.STRING
  });

  return { users };
};

module.exports = UserAPI;
