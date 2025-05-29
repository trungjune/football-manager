# Module Xác thực (Auth)

Module xác thực cung cấp các chức năng đăng ký, đăng nhập và xác thực người dùng trong hệ thống Football Manager.

## Cấu trúc thư mục

```
auth/
├── dto/                # Data Transfer Objects
│   ├── login.dto.ts    # DTO cho đăng nhập
│   └── register.dto.ts # DTO cho đăng ký
├── guards/             # Guards bảo vệ routes
│   ├── jwt-auth.guard.ts    # Guard cho JWT
│   ├── local-auth.guard.ts  # Guard cho đăng nhập local
│   └── google-auth.guard.ts # Guard cho Google OAuth
├── strategies/         # Passport strategies
│   ├── jwt.strategy.ts      # Strategy cho JWT
│   ├── local.strategy.ts    # Strategy cho đăng nhập local
│   └── google.strategy.ts   # Strategy cho Google OAuth
├── auth.controller.ts  # Controller xử lý các request
├── auth.service.ts     # Service xử lý logic nghiệp vụ
└── auth.module.ts      # Module configuration
```

## API Endpoints

### Đăng ký tài khoản mới

```
POST /auth/register
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

### Đăng nhập

```
POST /auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

### Lấy thông tin người dùng hiện tại

```
GET /auth/profile
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER"
}
```

### Đăng nhập với Google

```
GET /auth/google
```

Chuyển hướng người dùng đến trang đăng nhập của Google.

### Callback URL cho Google OAuth

```
GET /auth/google/callback
```

Callback URL mà Google sẽ chuyển hướng người dùng đến sau khi xác thực thành công.

## Các thành phần chính

### DTOs (Data Transfer Objects)

#### RegisterDto

```typescript
export class RegisterDto {
  @ApiProperty({ example: "user@example.com", description: "Email address" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "John Doe", description: "Full name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "password123", description: "Password" })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
```

#### LoginDto

```typescript
export class LoginDto {
  @ApiProperty({ example: "user@example.com", description: "Email address" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "password123", description: "Password" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
```

### Guards

#### JwtAuthGuard

Guard bảo vệ các routes yêu cầu xác thực JWT.

```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
```

#### LocalAuthGuard

Guard xác thực thông tin đăng nhập (email và password).

```typescript
@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {}
```

#### GoogleAuthGuard

Guard xác thực với Google OAuth.

```typescript
@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {}
```

### Strategies

#### JwtStrategy

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET", "football_manager_secret"),
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findByEmail(payload.email);
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      name: user.name,
    };
  }
}
```

#### LocalStrategy

```typescript
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return user;
  }
}
```

#### GoogleStrategy

```typescript
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      clientID: configService.get("GOOGLE_CLIENT_ID", ""),
      clientSecret: configService.get("GOOGLE_CLIENT_SECRET", ""),
      callbackURL: configService.get(
        "GOOGLE_CALLBACK_URL",
        "http://localhost:3001/auth/google/callback"
      ),
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      accessToken,
    };

    const validatedUser = await this.authService.validateOAuthUser(user);
    done(null, validatedUser);
  }
}
```

### AuthService

Service xử lý logic nghiệp vụ liên quan đến xác thực.

```typescript
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  // Xác thực người dùng với email và password
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Đăng nhập và trả về JWT token
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  // Đăng ký người dùng mới
  async register(registerDto: RegisterDto) {
    const { email } = registerDto;
    const existingUser = await this.usersService.findByEmail(email);
    
    if (existingUser) {
      throw new ConflictException("Email already exists");
    }
    
    const user = await this.usersService.create(registerDto);
    return this.login(user);
  }

  // Xác thực người dùng với OAuth
  async validateOAuthUser(profile: any): Promise<any> {
    let user = await this.usersService.findByEmail(profile.email);
    
    if (!user) {
      user = await this.usersService.create({
        email: profile.email,
        name: profile.name,
        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
      });
    }
    
    return user;
  }
}
```

### AuthModule

Module configuration cho xác thực.

```typescript
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET', 'football_manager_secret'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION', '1d'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

## Cách sử dụng

### Đăng ký và đăng nhập

1. Gửi request POST đến `/auth/register` với thông tin đăng ký
2. Hoặc gửi request POST đến `/auth/login` với thông tin đăng nhập
3. Lưu JWT token nhận được từ response

### Bảo vệ routes

Để bảo vệ một route yêu cầu xác thực:

```typescript
@UseGuards(JwtAuthGuard)
@Get('protected-route')
getProtectedData() {
  // Route này chỉ có thể truy cập bởi người dùng đã xác thực
}
```

### Truy cập thông tin người dùng trong controller

```typescript
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Req() req) {
  // req.user chứa thông tin người dùng đã được xác thực
  return req.user;
}
``` 