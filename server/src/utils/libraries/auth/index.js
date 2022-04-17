import passport from 'passport';
import initializeJWT from './jwt';
import { getOneUser } from '../../../services/user';

const secretOrKey = process.env.AUTH_SECRET || 'ANDREAS_JWT_SECRET';

initializeJWT({ passport, secretOrKey, getOneUser });

export default passport;
