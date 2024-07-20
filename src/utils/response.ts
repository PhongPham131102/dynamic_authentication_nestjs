export enum RESPONSE_STATUS {
  SUCCESS = 1,
  FAILED = 0,
  REDIRECT = 2,
}

export const Response = <T>({
  statusCode,
  message,
  result,
}: {
  statusCode: RESPONSE_STATUS;
  message?: string;
  result?: T;
}) => {
  return {
    status: statusCode,
    message,
    result: result || {},
  };
};
