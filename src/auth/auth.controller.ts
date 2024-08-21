import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/loginDTO';
import { log } from 'util';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() loginDto: LoginUserDto): Promise<any> { 
        const { username, email } = loginDto;

        if (username){
            console.log(username);
            return this.authService.signIn(username, loginDto.password);
        }
        else if (email)
            return this.authService.signIn(email, loginDto.password);
        else
            throw new UnauthorizedException();
    }
}
