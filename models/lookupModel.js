import dbClient from '../dbHelper/index.js'

export const fetchTypes = async () => {
    try{
        const [result] = await dbClient.query(`SELECT 
            type_id,type_name,internal_name
            FROM types;
        `)
        return result

    } catch (err) {
        return {error: true, message: err.message}
    }
}

export const fetchIndustries = async () => {
    try{
        const [result] = await dbClient.query(`SELECT 
            industry_id,industry_name,internal_name 
            FROM industries;
        `)
        return result
    } catch (err) {
        return {error: true, message: err.message}
    }
}

export const fetchStatuses = async () => {
    try{
        const [result] = await dbClient.query(`SELECT 
            status_id, status_name, internal_name 
        FROM status;
        `)
        return result        
    } catch (err) {
        return {error: true, message: err.message}
    }
}
