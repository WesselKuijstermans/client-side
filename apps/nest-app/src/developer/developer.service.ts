import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from './developer';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(Developer)
    private readonly developerRepository: Repository<Developer>,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  async findAll(): Promise<Developer[]> {
    return this.developerRepository.find();
  }

  async findById(id: number): Promise<Developer> {
    return this.developerRepository.findOne({
      where: { id },
      relations: ['games', 'games.platforms', 'games.platforms.platform'],
    });
  }

  async findByName(name: string): Promise<Developer> {
    return this.developerRepository.findOne({
      where: { name },
      relations: ['games', 'games.platforms', 'games.platforms.platform'],
    });
  }

  async findByUserId(req: Request): Promise<Developer[]> {
    const userId = this.authService.verifyAuthHeader(
      req.headers['authorization']
    );
    return this.developerRepository
      .createQueryBuilder('developer')
      .leftJoinAndSelect('developer.games', 'games')
      .where('developer.createdBy.id = :userId', { userId })
      .getMany();
  }

  async create(developer: Developer, req: Request): Promise<Developer> {
    const reqId = this.authService.verifyAuthHeader(
      req.headers['authorization']
    );
    const user = await this.userService.findById(reqId);
    developer.createdBy = user;
    return this.developerRepository.save(developer);
  }

  async update(developer: Developer, req: Request): Promise<Developer> {
    const reqId = this.authService.verifyAuthHeader(
      req.headers['authorization']
    );
    if (reqId !== developer.createdBy.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.developerRepository.save(developer);
  }

  async delete(id: number, req: Request): Promise<void> {
    const reqId = this.authService.verifyAuthHeader(
      req.headers['authorization']
    );
    const developer = await this.developerRepository.findOneBy({ id });
    if (reqId !== developer.createdBy.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    await this.developerRepository.delete(id);
  }
}
