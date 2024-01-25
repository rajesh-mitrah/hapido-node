import { ERROR_MESSAGE, STATUS } from '../utils/constants.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import { successHandler } from '../middlewares/successHandler.js';
import { companyExistsById } from '../middlewares/passwordHasing.js';
import { fetchAllConnections, insertConnection, requestReceived, requestSent, updateConnection } from '../models/companyModel.js';

const getConnections = async (req, res) => {
    try {
        const [data, fields] = await fetchAllConnections();
        return successHandler(STATUS.SUCCESS.CODE, res, data);
    } catch (error) {
        return errorHandler(STATUS.INTERNAL_ERROR.CODE, res, { error: ERROR_MESSAGE.WENT_WRONG });
    }
};

const sendRequest = async (req, res) => {
    const { company_id, request_company_id, status } = req.body;
    try {
        const newUser = await insertConnection({ company_id, request_company_id, status })
        return successHandler(STATUS.SUCCESS.CODE, res, { message: "Request have been send successfully" });
    } catch (error) {
        return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error: ERROR_MESSAGE.WENT_WRONG });
    }
}

const updateStatus = async (req, res) => {
    const { company_id, request_company_id, status } = req.body;
    try {
        const alreadyExistsCompany = await companyExistsById(company_id);
        if (alreadyExistsCompany) {
            const data = await updateConnection({ company_id, request_company_id, status });
            return successHandler(STATUS.SUCCESS.CODE, res, { message: "Request have been send successfully" });
        } else {
            return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error: ERROR_MESSAGE.WENT_WRONG });
        }
    } catch (error) {
        return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error: ERROR_MESSAGE.WENT_WRONG });
    }
}

const requestSend = async (req, res) => {
    try {
        const [data, filelds] = await requestSent(req.email)
        return successHandler(STATUS.SUCCESS.CODE, res, { data });
    } catch (error) {
        return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error: ERROR_MESSAGE.WENT_WRONG });
    }
}

const requestReceive = async (req, res) => {
    try {
        const result = await requestReceived(req.email)
        return successHandler(STATUS.SUCCESS.CODE, res, { message: "Request have been send successfully" });
    } catch (error) {
        return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error: ERROR_MESSAGE.WENT_WRONG });
    }
}

export default { sendRequest, updateStatus, getConnections, requestSend, requestReceive }
