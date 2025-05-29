import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOne(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
    }>;
    update(id: string, updateUserDto: any): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        teamId: string | null;
    }>;
}
