import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user";
import { Repository } from "typeorm";
import { Request } from 'express';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserService {
    
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly authService: AuthService) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findById(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOneBy({ email });
    }

    async update(user: User, req: Request): Promise<User> {
        const reqId = this.authService.verifyAuthHeader(req.headers['authorization']);
        if (reqId !== user.id) {
            throw new UnauthorizedException('Unauthorized');
        }
        return this.userRepository.save(user);
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}