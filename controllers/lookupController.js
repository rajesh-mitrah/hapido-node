import { fetchTypes, fetchIndustries, fetchStatuses } from '../models/lookupModel.js';
import { ERROR_MESSAGE, STATUS, SUCCESS_MESSAGE } from '../utils/constants.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import { successHandler } from '../middlewares/successHandler.js';


const getTypes =async (req,res) => {   
    try {        
        const response = await fetchTypes();
        if (response.error){
            errorHandler(STATUS.INTERNAL_ERROR.CODE, res, { message: ERROR_MESSAGE.WENT_WRONG });
        } else if (response.length){            
            successHandler(STATUS.SUCCESS.CODE, res, { message: SUCCESS_MESSAGE.GET_TYPES_SUCCESS, data: response });
        }else{           
            errorHandler(STATUS.NOT_FOUND.CODE, res, { message: STATUS.NOT_FOUND.TEXT });
        }
    } catch (error) {       
        errorHandler(STATUS.INTERNAL_ERROR.CODE, res, { message: ERROR_MESSAGE.WENT_WRONG });
    }
}

const getIndustries = async (req,res) => {
    try {
        const response = await fetchIndustries()
        if (response.error){
            errorHandler(STATUS.INTERNAL_ERROR.CODE, res, { message: ERROR_MESSAGE.WENT_WRONG });
        } else if (response.length){            
            successHandler(STATUS.SUCCESS.CODE, res, { message: SUCCESS_MESSAGE.GET_TYPES_SUCCESS, data: response });
        }else{           
            errorHandler(STATUS.NOT_FOUND.CODE, res, { message: STATUS.NOT_FOUND.TEXT });
        }
    } catch (error) {
        errorHandler(STATUS.INTERNAL_ERROR.CODE, res, { message: ERROR_MESSAGE.WENT_WRONG });
    }
}

const getStatus = async (req, res) => {
    try {
        const response = await fetchStatuses();
        if (response.error){
            errorHandler(STATUS.INTERNAL_ERROR.CODE, res, { message: ERROR_MESSAGE.WENT_WRONG });
        } else if (response.length){            
            successHandler(STATUS.SUCCESS.CODE, res, { message: SUCCESS_MESSAGE.GET_TYPES_SUCCESS, data: response });
        }else{           
            errorHandler(STATUS.NOT_FOUND.CODE, res, { message: STATUS.NOT_FOUND.TEXT });
        }
    } catch (error) {
        errorHandler(STATUS.INTERNAL_ERROR.CODE, res, { message: ERROR_MESSAGE.WENT_WRONG });
    }
}

export default { getTypes, getIndustries, getStatus }