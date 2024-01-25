import { fetchUserByEmail, fetchUserById, deleteUserDetails, updateUserDetails, fetchUsers } from "../models/userModel.js";
import { fetchAllCompanies } from '../models/companyModel.js'
import { errorHandler } from '../middlewares/errorHandler.js';
import { successHandler } from '../middlewares/successHandler.js';
import { insertData } from "../models/userModel.js";
import { DEFAULT_PARAMETERS, ERROR_MESSAGE, STATUS, SUCCESS_MESSAGE } from "../utils/constants.js";
import { emailExists, companyExists, hashPassword } from '../middlewares/passwordHasing.js';

const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        errorHandler(STATUS.NOT_AUTHENTICATED.CODE, res, {
            error: ERROR_MESSAGE.ID_REQUIRED
        });
    } else {
        try {
            const hasUser = await deleteUserDetails(id);
            if (hasUser.rowCount) {
                successHandler(STATUS.ACCEPTED.CODE, res, {
                    message: SUCCESS_MESSAGE.REMOVE_USER
                });
            } else {
                errorHandler(STATUS.BAD_REQUEST.CODE, res, {
                    error: ERROR_MESSAGE.USER_ID_NOT_EXIST
                });
            }
        } catch (error) {
            errorHandler(STATUS.BAD_REQUEST.CODE, res, {
                error: ERROR_MESSAGE.WENT_WRONG
            });
        }
    }
};


const updateUser = async (req, res) => {
    const { id } = req.params;
    let error = '';
    const { first_name, last_name } = req.body;
    if (!id) {
        return errorHandler(STATUS.BAD_REQUEST.CODE, res, {
            message: ERROR_MESSAGE.USER_ID_REQUIRED
        });
    } else {
        const [data, fields] = await fetchUserById(id);
        if (data) {
            if (first_name && last_name) {
                await updateUserDetails(req.body, id);
                return successHandler(STATUS.SUCCESS.CODE, res, {
                    message: SUCCESS_MESSAGE.USER_DETAILS_UPDATE
                });
            } else {
                return errorHandler(STATUS.BAD_REQUEST.CODE, res, {
                    error: ERROR_MESSAGE.NAMES_ARE_REQUIRED
                });
            }
        } else {
            return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error: ERROR_MESSAGE.USER_NOT_FOUND });
        }
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return errorHandler(STATUS.BAD_REQUEST.CODE, res, { message: ERROR_MESSAGE.USER_ID_REQUIRED });
    } else {
        try {
            const [data, fields] = await fetchUserById(id);
            if (data) {
                return successHandler(STATUS.SUCCESS.CODE, res, data);
            } else {
                return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error: ERROR_MESSAGE.USER_NOT_FOUND });
            }
        }
        catch (error) {
            return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error: ERROR_MESSAGE.WENT_WRONG });
        }
    }
}

const getUserByEmail = async (req, res) => {
    const { email } = req.params;
    if (!email) {
        return errorHandler(STATUS.BAD_REQUEST.CODE, res, {
            message: ERROR_MESSAGE.USER_EMAIL_REQUIRED
        });
    } else {
        try {
            const [data, fields] = await fetchUserByEmail(email);
            if (data.length) {
                return successHandler(STATUS.SUCCESS.CODE, res, data);
            } else {
                return errorHandler(STATUS.BAD_REQUEST.CODE, res, { error: ERROR_MESSAGE.USER_NOT_FOUND });
            }
        } catch (err) {
            return errorHandler(STATUS.BAD_REQUEST.CODE, res, {
                error: ERROR_MESSAGE.WENT_WRONG
            });
        }
    }
};

const getAllUsers = async (req, res) => {
    try {
        const [data, fields] = await fetchUsers();
        return successHandler(STATUS.SUCCESS.CODE, res, data);
    } catch (error) {
        return errorHandler(STATUS.INTERNAL_ERROR.CODE, res, { error: ERROR_MESSAGE.WENT_WRONG });
    }
};

export default { getAllUsers, getUserById, getUserByEmail, deleteUser, updateUser };
