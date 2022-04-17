import { getUserById, getUsers } from '../../services/user/userBaseService';
import { successResponse, errorResponse } from '../../utils/utils/helpers';

export async function getUserController(httpRequest) {
  try {
    const payload = httpRequest.requestBody;
    const user = await getUserById(payload.user_id);
    return successResponse({ user });
  } catch (err) {
    throw errorResponse(err.message, err.code || err.statusCode, err.errorCode);
  }
}

export async function getUsersController(httpRequest) {
  try {
    const users = await getUsers();
    return successResponse({ users });
  } catch (err) {
    throw errorResponse(err.message, err.code || err.statusCode, err.errorCode);
  }
}
