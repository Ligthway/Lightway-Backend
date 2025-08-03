import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

import { DatabaseService } from '../../database/database.service'
import { users } from '../../database/schema'
import * as bcrypt from 'bcrypt'

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
