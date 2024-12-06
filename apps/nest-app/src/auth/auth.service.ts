import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "./auth";
import { Repository } from "typeorm";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import bcrypt from 'bcrypt';
import { AuthResponse, LoginRequest, RegisterRequest } from "@client-side/shared-lib";
import { User } from "../user/user";
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
                @InjectRepository(User) private readonly userRepository: Repository<User>) {}

    
    async login(authRequest: LoginRequest): Promise<AuthResponse> {
        const { email, password } = authRequest;
        const auth = await this.authRepository.findOne({ where: { email: email } });
        if (!auth) {
            throw new NotFoundException('User not found');
        }
        const salt = auth.salt;
        const hash = this.hashPassword(password, salt);
        if (this.authRepository.existsBy({ email: email, password: hash })) {
            const user = await this.userRepository.findOne({ where: { email: email } });
            return new AuthResponse(this.generateToken(user.id), user);
        }
    }

    async register(authRequest: RegisterRequest): Promise<AuthResponse> {
        const { name, email, password } = authRequest;
        if (await this.authRepository.findOne({ where: { email: email } })) {
            throw new BadRequestException('A user with this email already exists');
        }
        const salt = this.generateSalt();
        const hash = this.hashPassword(password, salt);
        const auth = new Auth();
        auth.email = email;
        auth.password = hash;
        auth.salt = salt;
        this.authRepository.save(auth)
        let user = new User();
        user.name = name;
        user.email = email;
        user = this.userRepository.create(user);
        user = await this.userRepository.save(user);
        return new AuthResponse(this.generateToken(user.id), user);

    }

    private hashPassword(password: string, salt: string): string {
        return bcrypt.hashSync(password, salt);
    }

    private generateSalt(): string {
        return bcrypt.genSaltSync();
    }
        
    private generateToken(id: number): string {
        const payload = { id };
        return sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    public verifyAuthHeader(header: string): number {
        if (!header) {
            throw new BadRequestException('Authorization header is required');
        }
        if (!header.startsWith('Bearer ')) {
            throw new BadRequestException('Invalid authorization header');
        }
        const token = header.split(' ')[1];
        const payload = verify(token, process.env.JWT_SECRET);

        if (typeof payload === 'string' || !payload.id) {
            throw new BadRequestException('Invalid token payload');
        }
        
        return parseInt(payload.id);
    }
}