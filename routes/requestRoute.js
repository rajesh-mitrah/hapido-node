import express from 'express';
import {
	ENDPOINTS,
} from '../utils/constants.js';
import requestController from '../controllers/requestController.js';

const router = express.Router();

router.post(
	ENDPOINTS.SEND_REQUEST,
	requestController.sendRequest
);


export default router;
