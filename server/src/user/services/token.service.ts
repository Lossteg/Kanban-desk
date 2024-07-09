import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async saveToken(
    userId: number,
    token: string,
    expiresAt: Date,
  ): Promise<Token> {
    const tokenEntity = this.tokenRepository.create({
      user: { user_id: userId },
      token,
      expires_at: expiresAt,
    });
    return this.tokenRepository.save(tokenEntity);
  }

  async findToken(token: string): Promise<Token | undefined> {
    return this.tokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });
  }

  async validateToken(token: string): Promise<Token> {
    const tokenEntity = await this.tokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!tokenEntity) {
      return null;
    }
    if (tokenEntity.is_revoked) {
      return null;
    }
    if (new Date() > tokenEntity.expires_at) {
      return null;
    }

    return tokenEntity;
  }

  async revokeToken(token: string): Promise<Token> {
    const tokenEntity = await this.tokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!tokenEntity) {
      throw new NotFoundException('Token not found');
    }

    tokenEntity.is_revoked = true;
    tokenEntity.revoked_at = new Date();

    return this.tokenRepository.save(tokenEntity);
  }
}
