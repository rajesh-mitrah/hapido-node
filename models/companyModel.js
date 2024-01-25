import dbClient from "../dbHelper/index.js";
import { v4 as uuidv4 } from 'uuid'

const fetchCompanyName = async (name) => await dbClient.execute(`SELECT * FROM company WHERE company_name = '${name}'`);

const fetchCompanyId = async (id) => await dbClient.execute(`SELECT * FROM company WHERE company_id = '${id}'`);

const fetchAllCompanies = async () => await dbClient.execute(`SELECT * FROM company`)

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
  const response_1 = await dbClient.execute(
    'INSERT INTO connection_invite (company_id, request_company_id, status_internal_name) VALUES (?, ?, ?)',
    [
      data.company_id,
      data.request_company_id,
      data.status,
    ]
  );
  return { response_1, response_2 }
}

const updateConnection = async (data) => {
  const {
    company_id,
    status,
  } = data;
  // const response = await dbClient.execute(`UPDATE company SET type = '${type}', size = '${size}', industry = '${industry}' WHERE company_name = '${name}'`);
  const response = await dbClient.execute(
    'UPDATE connection_invite SET status_internal_name = ? WHERE company_id = ?',
    [status, company_id]
  );
  return response;
};

export { fetchCompanyName, fetchCompanyId, fetchAllCompanies, updateCompanyDetails, insertCompany, insertConnection, updateConnection };
