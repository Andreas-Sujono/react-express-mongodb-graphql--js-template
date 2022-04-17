import express from 'express';
// import authenticateJWT from '../middlewares/authenticate-middleware';
// import makeRoleMiddleware from '../middlewares/role-middleware';
import makeExpressCallback from '../../utils/middlewares/makeExpressCallback';
import { getUsersController, getUserController } from '../../controllers/user';
import { USER_ROLE } from '../../utils/constants/user';

const userRouter = express.Router();

userRouter.get(
  '/',
  // authenticateJWT(),
  // makeRoleMiddleware(USER_ROLE.ADMIN),
  makeExpressCallback(getUsersController)
);

export default userRouter;
