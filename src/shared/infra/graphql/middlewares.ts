export const isAuthenticatedMiddleware = ({ root, args, context, info }, next): Promise<any> => {
  console.log(context.userId);
  return next();
};
