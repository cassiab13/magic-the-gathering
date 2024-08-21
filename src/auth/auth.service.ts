import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashPassword } from 'src/common/password';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly password: HashPassword,
        private readonly jwtService: JwtService
    ) { }
    
    async signIn(usernameOrEmail: string, password: string): Promise<{access_token: string}>{
        const user = await this.userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        if (!user || !(await this.password.comparingPassword(password, user.password)))
        {
            throw new UnauthorizedException();
        }
        const payload = { sub: user._id, username: user.username };
        return { access_token: await this.jwtService.signAsync(payload) }
    }
}
