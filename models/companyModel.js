import dbClient from "../dbHelper/index.js";
import { v4 as uuidv4 } from 'uuid'

const fetchCompanyName = async (name) => await dbClient.execute(`SELECT * FROM company WHERE company_name = '${name}'`);

const fetchCompanyId = async (id) => await dbClient.execute(`SELECT * FROM company WHERE company_id = '${id}'`);

const fetchAllCompanies = async () => await dbClient.execute(`SELECT * FROM company`);

const updateCompanyDetails = async (data, id) => {
  const {
    type,
    size,
    industry,
    company_name
  } = data;
  // const response = await dbClient.execute(`UPDATE company SET type = '${type}', size = '${size}', industry = '${industry}' WHERE company_id = '${id}'`);
  const response = await dbClient.execute(
    'UPDATE company SET company_name = ?, type = ?, size = ?, industry = ? WHERE company_id = ?',
    [company_name, type, size, industry, id]
  );
  return response;
};

const insertCompany = async data => {
  const newCompanyId = uuidv4();
  const response_1 = await dbClient.query(
    'INSERT INTO company (company_name, company_id, type, size, industry) VALUES (?, ?, ?, ?, ?)',
    [
      data.company_name,
      newCompanyId,
      data.type,
      data.size,
      data.industry,
    ]
  );
  const response_2 = await dbClient.query(
    'UPDATE users SET company_id = ? WHERE email = ?',
    [newCompanyId, data.email]
  );
  return { response_1, response_2 }
}

const insertConnection = async data => {
  const newXId = uuidv4();
  const response = await dbClient.execute(
    'INSERT INTO connection_invite (xid, company_id, request_company_id, status_internal_name) VALUES (?, ?, ?, ?)',
    [
      newXId,
      data.company_id,
      data.request_company_id,
      data.status,
    ]
  );
  return response
}

const updateConnection = async (data) => {
  const {
    company_id,
    status,
  } = data;
  const response = await dbClient.execute(
    'UPDATE connection_invite SET status_internal_name = ? WHERE company_id = ?',
    [status, company_id]
  );
  return response;
};

const fetchAllConnections = async () => await dbClient.execute(`SELECT * FROM connection_invite`);

const fetchAll = async (email) => {
  const result = await dbClient.query(`
    select 
    c.company_id , c.company_name , c.size , c.type , c.industry,
    ci.status_internal_name as status
    from company c 
    LEFT join connection_invite ci  on ci.request_company_id = c.company_id 
    where c.company_id != (select company_id from users u where email = '${email}')
  `);
  return result;
}

const requestSent = async (email) => {
  const response = await dbClient.execute(
    `SELECT 
    c.company_id , c.company_name , c.size , c.type , c.industry,
    ci.status_internal_name as status
  FROM company c 
  INNER JOIN connection_invite ci  ON ci.request_company_id = c.company_id AND ci.company_id  = ?`,
    [email]
  );
  return response;
};

const requestReceived = async (email) => {
  const response = await dbClient.execute(
    `SELECT 
    c.company_id , c.company_name , c.size , c.type , c.industry,
    ci.status_internal_name as status
  FROM company c 
  INNER JOIN connection_invite ci  ON ci.company_id = c.company_id AND ci.request_company_id = ?`,
    [email]
  );
  return response;
};


export {
  fetchCompanyName, fetchCompanyId, fetchAllCompanies, updateCompanyDetails, insertCompany, insertConnection,
  updateConnection, fetchAllConnections, requestSent, requestReceived
};
