import express from 'express';
import { ENDPOINTS } from '../utils/constants.js';
import { authenticateJWT } from '../middlewares/jwtToken.js';
import companyController from '../controllers/companyController.js';

const router = express.Router();

router.post(
    ENDPOINTS.ADD_COMPANY_PROFILE,
    authenticateJWT,
    companyController.addCompany
)

// router.get(
//     ENDPOINTS.GET_COMPANY_BY_NAME,
//     authenticateJWT,
//     companyController.getCompanyByName
// )

router.get(
    ENDPOINTS.GET_COMPANY_BY_ID,
    authenticateJWT,
    companyController.getCompanyById
)

router.get(
    ENDPOINTS.GET_ALL_COMPANY_DETAILS,
    authenticateJWT,
    companyController.getAllCompanies
)

router.put(
    ENDPOINTS.UPDATE_COMPANY_PROFILE,
    authenticateJWT,
    companyController.updateCompany
)

export default router;