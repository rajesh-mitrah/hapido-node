import express from 'express';

import getLookupDataController from '../controllers/lookupController.js'
import { ENDPOINTS } from '../utils/constants.js';

const router = express.Router();

router.get(ENDPOINTS.GET_LOOKUP_TYPES, getLookupDataController.getTypes)
router.get(ENDPOINTS.GET_LOOKUP_INDUSTRIES, getLookupDataController.getIndustries)
router.get(ENDPOINTS.GET_LOOKUP_STATUS, getLookupDataController.getStatus)


export default router