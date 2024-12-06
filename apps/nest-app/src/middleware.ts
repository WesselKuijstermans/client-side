import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class Middleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    use(req: Request, res: Response, next: NextFunction) {
        if (req.originalUrl.includes('/login') || req.originalUrl.includes('/register')) {
            return next();
        }
        
        const token = req.headers['authorization'].split(' ')[1];

        try {
            jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}