import * as bcrypt from 'bcrypt';
import dbClient from '../dbHelper/index.js';

// Function for password decryption
export async function hashPassword(plaintextPassword) {
	const hash = await bcrypt.hash(plaintextPassword, 10);
	return hash;
	// Store hash in the database
}

// Function for password encryption
export async function ComparePassword(plaintextPassword, hash) {
	const result = await bcrypt.compare(plaintextPassword, hash);
	return result;
}

export const emailExists = async email => {
	const [data, fields] = await dbClient.execute('SELECT * FROM users WHERE email = ?', [email]);
	if (data.length == 0) return false;
	return data;
};

export const companyExists = async name => {
	const [data, fields] = await dbClient.execute('SELECT * FROM company WHERE company_name = ?', [name]);
	if (data.length == 0) return false;
	return data;
};

export const companyExistsById = async id => {
	const [data, fields] = await dbClient.execute('SELECT * FROM company WHERE company_id = ?', [id]);
	if (data.length == 0) return false;
	return data;
};
