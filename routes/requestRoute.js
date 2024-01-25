import express from 'express';
import {
	ENDPOINTS,
} from '../utils/constants.js';
import requestController from '../controllers/requestController.js';
import { authenticateJWT } from '../middlewares/jwtToken.js';

const router = express.Router();

router.get(
    ENDPOINTS.GET_CONNECTIONS,
    authenticateJWT,
	requestController.getConnections
)

router.post(
	ENDPOINTS.SEND_REQUEST,
    authenticateJWT,
	requestController.sendRequest
);

router.put(
    ENDPOINTS.UPDATE_STATUS,
    authenticateJWT,
	requestController.updateStatus
)

router.post(
    ENDPOINTS.REQUEST_SEND,
    authenticateJWT,
    requestController.requestSend
);

router.post(
    ENDPOINTS.REQUEST_RECEIVE,
    authenticateJWT,
    requestController.requestReceive
);


export default router;
