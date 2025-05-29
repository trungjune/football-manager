import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { GoogleAuthGuard } from "./guards/google-auth.guard";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: "User successfully registered" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOperation({ summary: "Login with email and password" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: "User successfully logged in" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  @ApiOperation({ summary: "Get user profile" })
  @ApiResponse({ status: 200, description: "User profile" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get("google")
  @ApiOperation({ summary: "Login with Google" })
  @ApiResponse({ status: 200, description: "Google authentication initiated" })
  googleAuth() {
    // This route initiates Google OAuth flow
  }

  @UseGuards(GoogleAuthGuard)
  @Get("google/callback")
  @ApiOperation({ summary: "Google OAuth callback" })
  @ApiResponse({ status: 200, description: "Google authentication successful" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  googleAuthCallback(@Req() req) {
    return this.authService.login(req.user);
  }
}
