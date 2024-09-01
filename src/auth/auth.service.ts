import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashPassword } from '../common/password';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly password: HashPassword,
        private readonly jwtService: JwtService
    ) { }
    
    public async signIn(usernameOrEmail: string, password: string): Promise<{access_token: string}>{
        const user = await this.userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        if (!user || !(await this.password.comparingPassword(password, user.password)))
        {
            throw new UnauthorizedException();
        }
        const payload = { sub: user._id, username: user.username, role: user.role, permission: user.permission };
        console.log("Payload", payload)
        return { access_token: await this.jwtService.signAsync(payload) }
    }
}
