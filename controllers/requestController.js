import { ERROR_MESSAGE, STATUS, SUCCESS_MESSAGE } from '../utils/constants.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import { successHandler } from '../middlewares/successHandler.js';

const sendRequest = async (req, res) => {
    const { company_id, request_company_id, status } = req.body;
    try {
        const alreadyExistsCompany = await companyExistsById(company_id);
        if (alreadyExistsCompany) {
            const data = await updateConnection({company_id, request_company_id, status});
            let response = { message: ERROR_MESSAGE.COMPANY_EXIST };
            return errorHandler(STATUS.BAD_REQUEST.CODE, res, response);
        }
        const newUser = await insertConnection({company_id, request_company_id, status})
        return successHandler(STATUS.SUCCESS.CODE, res, { message:  SUCCESS_MESSAGE.COMPANY_PROFILE_CREATED });
    } catch (error) {
        
    }
}

export default { sendRequest }
