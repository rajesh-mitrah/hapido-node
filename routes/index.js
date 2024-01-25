import { Router } from 'express';
import authRouter from './authRoute.js';
import userRouter from "./userRoute.js";
import companyRouter from "./companyRoute.js";
import requestRouter from "./requestRoute.js";
import lookupRouter from './lookupRoute.js'
const router = new Router();

router.use('/', authRouter);
router.use('/user', userRouter);
router.use('/company', companyRouter)
router.use('/connect', requestRouter)
router.use('/lookup', lookupRouter)

export default router;
