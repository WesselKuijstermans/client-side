import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class Middleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.originalUrl.includes('/login') || req.originalUrl.includes('/register') || req.method === 'GET') {
            console.log('Middleware bypassed');
            return next();
        }
        
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];

        console.log('Middleware token:', token);

        try {
            jwt.verify(token, process.env.JWT_SECRET);
            console.log('Middleware verified');
            next();
        } catch {
            console.log('Middleware unauthorized');
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}