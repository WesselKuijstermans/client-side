import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequest, RegisterRequest } from "@client-side/shared-lib";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() authRequest: LoginRequest) {
        return this.authService.login(authRequest);
    }

    @Post('register')
    register(@Body() authRequest: RegisterRequest) {
        return this.authService.register(authRequest);
    }
}