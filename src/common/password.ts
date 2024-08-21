import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPassword {
    private static readonly saltOrRounds: number = 10;
    
    public static async hashingPassword(password: string): Promise<string>{
        return bcrypt.hash(password, this.saltOrRounds);
    }

    public async comparingPassword(password: string, hash: string): Promise<boolean>{
        return bcrypt.compare(password, hash);
    }
}