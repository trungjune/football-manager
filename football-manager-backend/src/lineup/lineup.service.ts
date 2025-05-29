import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TeamGenerationHistory, TeamTemplate } from "./lineup.entity";
import { CreateTeamDto, MemberDto } from "./dto/create-team.dto";

@Injectable()
export class LineupService {
  constructor(
    @InjectRepository(TeamGenerationHistory)
    private teamHistoryRepository: Repository<TeamGenerationHistory>,
    @InjectRepository(TeamTemplate)
    private teamTemplateRepository: Repository<TeamTemplate>
  ) {}

  async generateTeams(
    createTeamDto: CreateTeamDto,
    userId?: string
  ): Promise<TeamGenerationHistory> {
    const { name, members, numberOfTeams, teamNames } = createTeamDto;

    // Sắp xếp ngẫu nhiên danh sách thành viên
    const shuffledMembers = this.shuffleArray([...members]);

    // Chia đội dựa trên kỹ năng
    const teams = this.balanceTeamsBySkill(
      shuffledMembers,
      numberOfTeams,
      teamNames
    );

    // Lưu lịch sử chia đội nếu có userId
    const teamHistory = this.teamHistoryRepository.create({
      name,
      teams,
      user: userId ? { id: userId } : null,
    });

    return this.teamHistoryRepository.save(teamHistory);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  private balanceTeamsBySkill(
    members: MemberDto[],
    numberOfTeams: number,
    teamNames?: string[]
  ): {
    teamName: string;
    members: MemberDto[];
    totalSkill: number;
  }[] {
    // Sắp xếp thành viên theo kỹ năng giảm dần
    const sortedMembers = [...members].sort((a, b) => b.skill - a.skill);

    // Khởi tạo các đội
    const teams: {
      teamName: string;
      members: MemberDto[];
      totalSkill: number;
    }[] = Array.from({ length: numberOfTeams }, (_, i) => ({
      teamName: teamNames && teamNames[i] ? teamNames[i] : `Đội ${i + 1}`,
      members: [],
      totalSkill: 0,
    }));

    // Phân bổ người chơi theo thuật toán "snake draft"
    // Đội yếu nhất sẽ được chọn người chơi mạnh nhất tiếp theo
    for (let i = 0; i < sortedMembers.length; i++) {
      // Sắp xếp các đội theo tổng kỹ năng tăng dần
      teams.sort((a, b) => a.totalSkill - b.totalSkill);

      // Thêm người chơi vào đội yếu nhất
      const weakestTeam = teams[0];
      weakestTeam.members.push(sortedMembers[i]);
      weakestTeam.totalSkill += sortedMembers[i].skill;
    }

    // Sắp xếp lại các đội theo số thứ tự
    return teams.sort((a, b) => {
      const aNumber = parseInt(a.teamName.replace(/\D/g, ""));
      const bNumber = parseInt(b.teamName.replace(/\D/g, ""));
      return aNumber - bNumber;
    });
  }

  async getTeamHistory(id: string): Promise<TeamGenerationHistory> {
    return this.teamHistoryRepository.findOne({
      where: { id },
      relations: ["user"],
    });
  }

  async getUserTeamHistory(userId: string): Promise<TeamGenerationHistory[]> {
    return this.teamHistoryRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: "DESC" },
    });
  }
}
