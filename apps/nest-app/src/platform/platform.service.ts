import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Platform } from './platform';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { CreatePlatformDto } from 'shared-lib/src/lib/entities/platform';

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  async findAll(): Promise<Platform[]> {
    return this.platformRepository.find();
  }

  async findById(id: number): Promise<Platform> {
    return this.platformRepository.findOneBy({ id });
  }

  async create(platform: CreatePlatformDto, req: Request): Promise<Platform> {
    const reqId = this.authService.verifyAuthHeader(
      req.headers['authorization']
    );
    const user = await this.userService.findById(reqId);
    return this.platformRepository.save({
      ...platform,
      createdBy: user
    });
  }

  async update(platform: Platform, req: Request): Promise<Platform> {
    const reqId = this.authService.verifyAuthHeader(
      req.headers['authorization']
    );
    if (reqId !== platform.createdBy.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.platformRepository.save(platform);
  }

  async delete(id: number, req: Request): Promise<void> {
    const reqId = this.authService.verifyAuthHeader(
      req.headers['authorization']
    );
    const platform = await this.platformRepository.findOneBy({ id });
    if (reqId !== platform.createdBy.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    await this.platformRepository.delete(id);
  }
}
