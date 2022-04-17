import { UserModel } from './model';
import makeBaseDb from '../baseDB';

const UserDb = makeBaseDb(UserModel);

export default UserDb;
