import dotenv from 'dotenv';
dotenv.config();

export const port = {
	port: process.env.PORT || 8000
};

export const jwtConfig = {
	jwtsecret: process.env.JWT_SECRET
};

export const db_config = {
	db: {
		host: process.env.HOST,
		database: process.env.DB_NAME,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD
	}
};
