import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/api/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { Role } from '@/api/role/role.entity';
import { Provider } from '@/api/provider/provider.entity';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Provider) private providerRepository: Repository<Provider>,
    ) {}

  public async register(body: RegisterDto): Promise<User | never> {
    const { name, email, password }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    let role: Role = await this.roleRepository.findOne(body.roleId);
    if (!role) {
      throw new HttpException('Invalid role id', HttpStatus.BAD_REQUEST);
    }
    let provider: Provider;
    if (body.providerId) {
      provider = await this.providerRepository.findOne(body.providerId);
    }
    if(body.providerId && !provider) {
      throw new HttpException('Invalid provider id', HttpStatus.BAD_REQUEST);
    }
    user = new User();

    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);
    user.role = role;
    user.provider = provider;
    return this.repository.save(user);
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOne({ where: { email }, relations: ["role", "role.permissions", "provider"] });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {
    this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }
}
