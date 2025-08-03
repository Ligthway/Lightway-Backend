import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm'
import {DatabaseService} from "../../database/database.service";
import { users } from "../../database/schema";
import {CreateUserDto} from "./DTO/create-user-dto";
import * as bcrypt from 'bcrypt'



@Injectable()
export class UserService {
    constructor(private readonly databaseService:DatabaseService){}
    async findByEmail(email :string){
        const result=await this.databaseService.database
            .select()
            .from(users)                        // was .from('users')
            .where(eq(users.email, email))
            .limit(1);
        return result[0] || null;
    }
    async findById(id:string){
        const result = await this.databaseService.database
            .select({
                id: users.id,
                email: users.email,
                firstName: users.firstName,
                lastName: users.lastName,
                role: users.role,
                isActive: users.isActive,
                lastLoginAt: users.lastLogin,
                createdAt: users.createdAt,
            })
            .from(users)
            .where(eq(users.id, id))
            .limit(1);

        if (!result[0]) {
            throw new NotFoundException('User not found');
        }

        return result[0];
    }
    async create(user:CreateUserDto) {
        const saltRounds=10;
        const passwordHash=await bcrypt.hash(user.password, saltRounds);
        const [result] = await this.databaseService.database
            .insert(users)
            .values({
                email: user.email,
                passwordHash,
                role: user.role,
                firstName: user.firstName,       // fixed reference
                lastName: user.lastName,         // fixed reference
            })
            .returning({
                id: users.id,
                email: users.email,
                firstName: users.firstName,
                lastName: users.lastName,
                role: users.role,
                createdAt: users.createdAt,
            });
        return result;
    }
    async updateLastLogin(userId:string){
        await this.databaseService.database.update(users).set({lastLogin:new Date()}).where(eq(users.id, userId));
    }
    async validatePassword(plainPassword:string, hashPassword:string){
        return bcrypt.compare(plainPassword, hashPassword);
    }
}
