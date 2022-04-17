export const successResponse = (data, statusCode = 200) => {
  return {
    data,
    errorCode: 0,
    statusCode,
  };
};

export const errorResponse = (
  errorMessage,
  statusCode = 500,
  errorCode = 101
) => {
  return {
    data: null,
    errorMessage,
    errorCode,
    statusCode,
  };
};
