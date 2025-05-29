import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { LineupService } from "./lineup.service";
import { CreateTeamDto } from "./dto/create-team.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("lineup")
@Controller("lineup")
export class LineupController {
  constructor(private readonly lineupService: LineupService) {}

  @Post("generate")
  @ApiOperation({ summary: "Tạo đội ngẫu nhiên" })
  async generateTeams(@Body() createTeamDto: CreateTeamDto, @Req() req: any) {
    // Nếu có user đăng nhập, lấy userId
    const userId = req.user?.id;
    return this.lineupService.generateTeams(createTeamDto, userId);
  }

  @Get("history/:id")
  @ApiOperation({ summary: "Lấy chi tiết lịch sử chia đội" })
  async getTeamHistory(@Param("id") id: string) {
    return this.lineupService.getTeamHistory(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get("history")
  @ApiOperation({ summary: "Lấy lịch sử chia đội của người dùng" })
  async getUserTeamHistory(@Req() req: any) {
    return this.lineupService.getUserTeamHistory(req.user.id);
  }
}
