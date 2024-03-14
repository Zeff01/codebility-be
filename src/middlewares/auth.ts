import { type NextFunction, type Request, type Response } from "express";
import { HttpUnAuthorizedError } from "@/lib/errors";
import JwtUtil from "@/lib/jwt";
import UserService from "@/modules/users/users.service";
import { UserTypeEnum } from "@prisma/client";

const userService = new UserService();

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers?.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    // If no Authorization header or it doesn't start with 'Bearer'
    next(new HttpUnAuthorizedError("Unauthorized - Missing or invalid token"));
    return;
  }

  const token = authorizationHeader.slice(7);
  const secretKey = process.env.JWT_SECRET;

  // Verify the token
  const decodedPayload = JwtUtil.verifyToken(token, secretKey);

  if (!decodedPayload) {
    next(new HttpUnAuthorizedError("Unauthorized - Invalid token"));
    return;
  }

  const user: any = await userService.getUser(
    { id: decodedPayload?.id }, // Use optional chain here
    { id: true, email_address: true, userType: true },
  );

  // if (user.userType === UserTypeEnum.USER) {
  //   res.status(403).send('Access denied. You do not have admin privileges.');
  //   return;
  // }

  // Token is valid, you can access the decoded payload in `decodedPayload`
  // For example, you can store it in the request for further middleware/routes
  req.user = user;

  // Proceed to the next middleware/route
  next();
};

export const verifyAuthAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers?.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    // If no Authorization header or it doesn't start with 'Bearer'
    next(new HttpUnAuthorizedError("Unauthorized - Missing or invalid token"));
    return;
  }

  const token = authorizationHeader.slice(7);
  const secretKey = process.env.JWT_SECRET;

  // Verify the token
  const decodedPayload = JwtUtil.verifyToken(token, secretKey);

  if (!decodedPayload) {
    next(new HttpUnAuthorizedError("Unauthorized - Invalid token"));
    return;
  }

  const user: any = await userService.getUser(
    { id: decodedPayload?.id }, // Use optional chain here
    { id: true, email_address: true, userType: true },
  );

  if (user.userType === UserTypeEnum.USER) {
    res.status(403).send("Access denied. You do not have admin privileges.");
    return;
  }

  // Token is valid, you can access the decoded payload in `decodedPayload`
  // For example, you can store it in the request for further middleware/routes
  req.user = user;

  // Proceed to the next middleware/route
  next();
};

export const verifyAuthDeniedToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers?.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    // If no Authorization header or it doesn't start with 'Bearer'
    next(new HttpUnAuthorizedError("Unauthorized - Missing or invalid token"));
    return;
  }

  const token = authorizationHeader.slice(7);
  const secretKey = process.env.JWT_SECRET;

  // Verify the token
  const decodedPayload = JwtUtil.verifyToken(token, secretKey);

  if (!decodedPayload) {
    next(new HttpUnAuthorizedError("Unauthorized - Invalid token"));
    return;
  }

  const user: any = await userService.getUser(
    { id: decodedPayload?.id }, // Use optional chain here
    { id: true, email_address: true, userType: true },
  );

  if (user.userType === UserTypeEnum.DENIED) {
    res.status(403).send("Access denied. You do not have privileges.");
    return;
  }

  // Token is valid, you can access the decoded payload in `decodedPayload`
  // For example, you can store it in the request for further middleware/routes
  req.user = user;

  // Proceed to the next middleware/route
  next();
};
