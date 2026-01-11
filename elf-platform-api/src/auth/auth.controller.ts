import { Body, Controller, Post, Get, HttpCode, HttpStatus, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() registrationDto: RegisterDto) {
    return this.auth.register(registrationDto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: any) {
    return this.auth.login(loginDto);
  }

  // Add this to handle the profile check from your frontend Login.tsx
  @Get("profile")
  async getProfile() {
    // For now, this can return a simple message or be expanded later
    return { message: "Profile endpoint active" };
  }

  @Post("google")
  google(@Body("token") token: string) {
    return this.auth.googleLogin(token);
  }

  @Post("facebook")
  facebook(@Body("token") token: string) {
    return this.auth.facebookLogin(token);
  }
}