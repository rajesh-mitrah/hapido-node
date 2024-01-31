import dbClient from '../dbHelper/index.js'
import { v4 as uuidv4 } from 'uuid'

// const fetchUserById = async (id) => await dbClient.execute(`SELECT * FROM users WHERE id = '${id}'`)
const fetchUserById = async (id) => {
  const [rows, fields] = await dbClient.execute('SELECT * FROM users WHERE user_id = ?', [id]);
  return rows;
};

const fetchUserByEmail = async (email) => await dbClient.execute('SELECT * FROM users WHERE email = ?', [email])

const fetchUsers = async () => await dbClient.execute('SELECT * FROM users')

const fetchAllUsers = async ({ pageSize, offset, search_terms }) => {

  let condition = `WHERE 1 = 1`;
  if (search_terms) {
    condition = `
    WHERE u.email like '%${search_terms}%' OR u.full_name like '%${search_terms}%' OR u.city like '%${search_terms}%' OR u.state like '%${search_terms}%' OR u.country like '%${search_terms}% OR u.zip_code like '%${search_terms}%'
    `
  }

  const query = {
    text: `
        SELECT 
          u.id,
          u.email, u.first_name, u.last_name, u.full_name, u.phone, u.address1, u.address2, u.city, u.state, u.country, u.zip_code, s.status, s.id as status_id, r.role, r.id as role_id, u.dob
        FROM users u
        inner join roles r on r."role" = u."role" 
        inner join statuses s on s.status = u.status 
        ${condition}
        ORDER BY u.created_date
        LIMIT $1
        OFFSET $2
      `,
    values: [pageSize, offset],
  }
  return await dbClient.execute(query)
}

const updateUserDetails = async (data, id) => {
  const { first_name, last_name } = data;
  const response = await dbClient.execute(`UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?`,
    [
      first_name,
      last_name,
      id
    ]);
  return response;
};

const insertData = async data => {
  const newUuid = uuidv4();
  const response = await dbClient.execute(
    'INSERT INTO users (user_id, email, password_hash, first_name, last_name, role, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      newUuid,
      data.email,
      data.password_hash,
      data.first_name,
      data.last_name,
      data.role,
      data.is_active
    ]
  );
  return response
}

const SearchAllUsers = async ({ pageSize, offset, search_terms }) => {
  let condition = `WHERE 1 = 1`;
  if (search_terms) {
    condition = `WHERE email like '%${search_terms}%'`
  }
  return await dbClient.execute(
    `
        SELECT *
        FROM users
        ${condition}
        LIMIT ?
        OFFSET ?
      `,
    [pageSize, offset]
  )
}

const deleteUserDetails = async (id) => await dbClient.execute(`DELETE FROM users WHERE user_id = '${id}'`)

export { fetchUserById, fetchUserByEmail, fetchAllUsers, deleteUserDetails, updateUserDetails, insertData, fetchUsers, SearchAllUsers };