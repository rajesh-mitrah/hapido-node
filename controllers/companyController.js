import { fetchAllCompanies, fetchCompanyId, fetchCompanyName, insertCompany, insertConnection, updateCompanyDetails, updateConnection } from "../models/companyModel.js";
import { companyExists } from "../middlewares/passwordHasing.js";
import { ERROR_MESSAGE, STATUS, SUCCESS_MESSAGE } from "../utils/constants.js";
import { successHandler } from "../middlewares/successHandler.js";
import { errorHandler } from "../middlewares/errorHandler.js";

const addCompany = async (req, res) => {
    const { company_name, type, size, industry } = req.body;
    try {
        const alreadyExistsCompany = await companyExists(company_name)
        if (alreadyExistsCompany) {
            let response = { message: ERROR_MESSAGE.COMPANY_EXIST };
            return errorHandler(STATUS.BAD_REQUEST.CODE, res, response);
        }
        // const password_hash = await hashPassword(password)
        const storeData = {
            company_name: company_name,
            type: type,
            size: size,
            industry: industry,
            email:req.email
        }
        const newUser = await insertCompany(storeData)
        return successHandler(STATUS.SUCCESS.CODE, res, { message:  SUCCESS_MESSAGE.COMPANY_PROFILE_CREATED });
    } catch (error) {
        errorHandler(ERROR_MESSAGE.WENT_WRONG, res, error);
    }
}

const getCompanyByName = async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return errorHandler(STATUS.BAD_REQUEST.CODE, res, { message: ERROR_MESSAGE.COMPANY_NAME_REQUIRED });
    } else {
        try {
            const [data, field] = await fetchCompanyName(name);
            if (data?.length) {
                return successHandler(STATUS.SUCCESS.CODE, res, data);
            } else {
                return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error: ERROR_MESSAGE.COMPANY_NOT_FOUND });
            }
        }
        catch (error) {
            return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error: ERROR_MESSAGE.WENT_WRONG });
        }
    }
}

const getCompanyById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return errorHandler(STATUS.BAD_REQUEST.CODE, res, { message: ERROR_MESSAGE.COMPANY_ID_REQUIRED });
    } else {
        try {
            const [data, field] = await fetchCompanyId(id);
            if (data?.length) {
                return successHandler(STATUS.SUCCESS.CODE, res, data);
            } else {
                return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error: ERROR_MESSAGE.COMPANY_NOT_FOUND });
            }
        }
        catch (error) {
            return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error: ERROR_MESSAGE.WENT_WRONG });
        }
    }
}

const updateCompany = async (req, res) => {
    const { id } = req.params;
    const { type, size, industry, company_name } = req.body;
    try {
        if (!id) {
            return errorHandler(STATUS.BAD_REQUEST.CODE, res, {
                message: ERROR_MESSAGE.COMPANY_NAME_REQUIRED
            });
        } else {
            const [data, field] = await fetchCompanyId(id);
            if (data) {
                if (
                    (type || size || industry ) && company_name 
                ) {
                    let response = await updateCompanyDetails(req.body, id);
                    return successHandler(STATUS.SUCCESS.CODE, res, {
                        message: SUCCESS_MESSAGE.COMPANY_DETAILS_UPDATE
                    });
                }
            } else {
                return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error: ERROR_MESSAGE.COMPANY_NOT_FOUND });
            }
        }
    } catch (error) {
        return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error });
    }
};

const getAllCompanies = async (req, res) => {
    try {
        const [data, field] = await fetchAllCompanies();
        return successHandler(STATUS.SUCCESS.CODE, res, data);
    } catch (error) {
        return errorHandler(STATUS.INTERNAL_ERROR.CODE, res, { error: ERROR_MESSAGE.WENT_WRONG });
    }
};

const getAll = async (req, res) => {
    try {
        const [data] = await fetchAll(req.email);
        return successHandler(STATUS.SUCCESS.CODE, res, data);
    } catch (error) {
        return errorHandler(STATUS.INTERNAL_ERROR.CODE, res, { error: ERROR_MESSAGE.WENT_WRONG });
    }
};

export default { addCompany, getCompanyByName, getCompanyById, getAllCompanies, getAll, updateCompany };
