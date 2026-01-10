import { Body, Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto"; // Import the DTO

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true })) // 'whitelist' strips out extra fields not in DTO
  async register(@Body() registrationDto: RegisterDto) {
    return this.auth.register(registrationDto);
  }

  /**
   * Standard Login
   */
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: any) {
    return this.auth.login(loginDto);
  }

  /**
   * Social Logins (Existing)
   */
  @Post("google")
  google(@Body("token") token: string) {
    return this.auth.googleLogin(token);
  }

  @Post("facebook")
  facebook(@Body("token") token: string) {
    return this.auth.facebookLogin(token);
  }
}