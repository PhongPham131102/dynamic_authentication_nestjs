import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { User, UserDocument } from './user.entity';
import { PermissionService } from '../permission/permission.service';
import { RoleDocument } from '../role/role.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { adminRole, userDefault } from 'src/constants';
@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly permissionService: PermissionService,
  ) {}
  private readonly logger = new Logger(UserService.name);
  async onModuleInit() {
    try {
      for (const user of userDefault) {
        const checkUser = await this.userModel.findById(
          new Types.ObjectId(user._id),
        );
        if (!checkUser)
          await this.userModel.create({
            ...user,
            password: await bcrypt.hash(user.password, 10),
            _id: new Types.ObjectId(user._id),
          });
      }
      this.logger.verbose('Khởi tạo người dùng mặc định thành công!');
    } catch (error) {
      this.logger.error('Khởi tạo người dùng mặc định thất bại!');
    }
  }
  async findOneBy(filter: FilterQuery<UserDocument>) {
    return await this.userModel.findOne(filter);
  }
  async checkEmail(email: string) {
    if (!email) return null;
    const user = await this.userModel.findOne({ email, isDelete: false });
    return user;
  }
  async checkUsername(username: string) {
    const user = await this.userModel.findOne({ username, isDelete: false });
    return user;
  }
  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ username, isDelete: false });
    return user;
  }
  async checkPassword(password: string, hashPassword: string) {
    const isCorrectPassword = await bcrypt.compare(password, hashPassword);
    return isCorrectPassword;
  }
  async getUserById(id: string) {
    if (!id) {
      return null;
    }
    const user = await this.userModel
      .findOne({ _id: new Types.ObjectId(id), isDelete: false })
      .populate('role');
    const findPermission = await this.permissionService.getPermissionByRole(
      user.role._id,
    );

    return {
      ...user.toObject(),
      permission: findPermission,
    };
  }
  async create(createUserDto: CreateUserDto, role: RoleDocument) {
    if (role._id === new Types.ObjectId(adminRole))
      throw new HttpException(
        {
          message: 'Forbidden Action',
          status: HttpStatus.FORBIDDEN,
        },
        HttpStatus.FORBIDDEN,
      );
    const { password } = createUserDto;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashPassword,
      role: role,
    });
    return user;
  }
}
