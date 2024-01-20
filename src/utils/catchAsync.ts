import { Request, Response, NextFunction } from 'express';

const catchAsync = (fn: (req: Request, res: Response) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch((err) => next(err));
};

export = catchAsync;
