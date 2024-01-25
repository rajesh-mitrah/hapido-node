// import mysql from 'mysql2/promise';
import {createPool} from 'mysql2/promise';
import { db_config } from '../config/index.js';

const dbClient = await createPool({
	host: db_config.db.host,
	user: db_config.db.user,
	database: db_config.db.database,
	password: db_config.db.password,
	port: 3306,
	connectionLimit: 10
  });

export default dbClient;
