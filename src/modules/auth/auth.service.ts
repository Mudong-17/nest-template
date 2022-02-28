import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {CreateAuthDto} from './dto/create-auth.dto';
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {
    }

    async validateUser(username: string, password: string): Promise<any> {
        console.log('auth service validateUser', username, password);
        const data = await this.usersService.findOneByName(username);

        console.log('auth service validateUser data', data);

        const user = JSON.parse(JSON.stringify(data || {}));

        // password = cryptoString(password);

        if (user && user.password === password) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user) {
        console.log('login  xxxxxx', user);
        const payload = {
            username: user.name,
            userId: user['id'],
            roles: user.roles,
            status: user.status,
            department: user.department,
            phone: user.phone,
            avatar: user.avatar,
            departmentName: user.departmentName,
            departmentId: user.departmentId,
            areaId: user.areaId,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
