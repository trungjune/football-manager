import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { TeamsModule } from "./teams/teams.module";
import { MembersModule } from "./members/members.module";
import { MatchesModule } from "./matches/matches.module";
import { FinanceModule } from "./finance/finance.module";
import { LineupModule } from "./lineup/lineup.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    TeamsModule,
    MembersModule,
    MatchesModule,
    FinanceModule,
    LineupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
