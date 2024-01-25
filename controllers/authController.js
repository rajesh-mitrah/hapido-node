import { emailExists, hashPassword } from "../middlewares/passwordHasing.js";
import { insertData } from "../models/userModel.js";
import { ERROR_MESSAGE, STATUS } from "../utils/constants.js";
import { successHandler } from "../middlewares/successHandler.js";
import { errorHandler } from "../middlewares/errorHandler.js";

const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const alreadyExistsUser = await emailExists(email)
        if (alreadyExistsUser) {
            let response = { message: ERROR_MESSAGE.EMAIL_EXIST };
            return errorHandler(STATUS.BAD_REQUEST.CODE, res, response);
        }
        const password_hash = await hashPassword(password)
        const storeData = {
            email: email,
            password_hash: password_hash,
            first_name: first_name,
            last_name: last_name,
            role: "Admin",
            is_active: true
        }
        const newUser = await insertData(storeData)
        return successHandler(STATUS.SUCCESS.CODE, res, { message: "Registered successfully" });
    } catch (error) {
        errorHandler(ERROR_MESSAGE.WENT_WRONG, res, error);
    }
}

export default { register };