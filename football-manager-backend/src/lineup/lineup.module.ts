import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LineupController } from "./lineup.controller";
import { LineupService } from "./lineup.service";
import { TeamGenerationHistory, TeamTemplate } from "./lineup.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TeamGenerationHistory, TeamTemplate])],
  controllers: [LineupController],
  providers: [LineupService],
  exports: [LineupService],
})
export class LineupModule {}
