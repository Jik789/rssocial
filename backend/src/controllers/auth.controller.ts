import { NextFunction, Request, Response, CookieOptions } from 'express';
import { sign } from 'jsonwebtoken';
import { LoginInput, RegisterInput } from '../schemas/user.schema';
import userModel from '../models/user.model';
import { config } from '../config/config';
import CustomError, { hasCode } from '../util/customError';

const accessTokenCookie: CookieOptions = {
  maxAge: config.accessTokenExp,
  httpOnly: true,
  sameSite: 'lax'
};

if (process.env.NODE_ENV === 'production') accessTokenCookie.secure = true;

export const registerUser = async (
  req: Request<Record<string, never>, Record<string, never>, RegisterInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);

    const token = sign({ sub: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: config.accessTokenExp
    });
    res.cookie('token', token, accessTokenCookie);
    res.cookie('logged_in', true, { ...accessTokenCookie, httpOnly: false });

    res.status(201).json({
      status: 'success',
      message: 'Account created'
    });
  } catch (e) {
    if (hasCode(e) && e.code === 11000) {
      return next(new CustomError('Email already exist', 409));
    }
    next(e);
  }
};

export const loginUser = async (
  req: Request<Record<string, never>, Record<string, never>, LoginInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');

    if (!user || !(await user.verifyPassword(password))) {
      return next(new CustomError('Login or password are incorrect', 401));
    }

    const token = sign({ sub: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: config.accessTokenExp
    });
    res.cookie('token', token, accessTokenCookie);
    res.cookie('logged_in', true, { ...accessTokenCookie, httpOnly: false });

    res.status(200).json({
      status: 'success',
      message: 'Login successfull'
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.clearCookie('logged_in');
  return res.status(200).send({
    status: 'success',
    message: 'Logout successfull'
  });
};
