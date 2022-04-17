import { USER_ROLE } from '../constants/user';

export default function makeRoleMiddleware(roles = []) {
  return async function roleMiddeware(req, res, next) {
    const { user } = req;

    if (user.role === USER_ROLE.SUPERADMIN) {
      //superadmin can do anything
      return next();
    }

    if (
      user.role === USER_ROLE.ADMIN &&
      (roles.includes(USER_ROLE.USER) || roles.includes(USER_ROLE.ADMIN))
    ) {
      //admin can do "admin" and user stuff
      return next();
    }

    if (user.role === USER_ROLE.USER && roles.includes(USER_ROLE.USER)) {
      return next();
    }

    res.set({
      'Content-Type': 'application/json',
    });
    res.type('json');
    return res.status(403).send('Unauthorized to perform this action');
  };
}
