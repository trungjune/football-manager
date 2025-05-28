import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { MembersModule } from './members/members.module';
import { MatchesModule } from './matches/matches.module';
import { FinanceModule } from './finance/finance.module';
import { LineupModule } from './lineup/lineup.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // Cấu hình biến môi trường
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Cấu hình kết nối database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'football_manager'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV', 'development') !== 'production',
        logging: configService.get('NODE_ENV', 'development') !== 'production',
      }),
    }),
    
    // Các module của ứng dụng
    AuthModule,
    UsersModule,
    TeamsModule,
    MembersModule,
    MatchesModule,
    FinanceModule,
    LineupModule,
    CommonModule,
  ],
})
export class AppModule {} 