import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { StatusResponse } from 'src/common/StatusResponse';
import { UpdateRoleDto } from './dto/update-role.dto';
import { adminRole, roleDefault } from 'src/constants';
import { Permission } from '../permission/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Role') private roleModel: Model<Role>,
    @InjectModel('Permission') private permissionModel: Model<Permission>,
  ) {}
  onModuleInit() {
    this.initPackageEntity();
  }
  private readonly logger = new Logger(RoleService.name);
  async initPackageEntity() {
    try {
      for (const data of roleDefault) {
        const existingRole = await this.roleModel.findById(
          new Types.ObjectId(data._id),
        );
        if (!existingRole) {
          await this.roleModel.create(data);
        }
      }
      this.logger.verbose('Khởi tạo data cho role entity thành công');
    } catch (error) {
      this.logger.error('Không thể khởi tạo data cho role entity');
    }
  }
  async checkRole(name: string) {
    return await this.roleModel.findOne({ name });
  }
  async checkRoleById(id: string) {
    if (id === adminRole)
      throw new HttpException(
        {
          message: `You Don't Have Permission To Change Admin Role`,
          status: HttpStatus.FORBIDDEN,
        },
        HttpStatus.FORBIDDEN,
      );
    return await this.roleModel.findById(new Types.ObjectId(id));
  }
  async create(createRoleDto: CreateRoleDto) {
    try {
      const { name } = createRoleDto;
      const checkRole = await this.roleModel.findOne({ name });
      if (checkRole)
        throw new HttpException(
          {
            status: StatusResponse.FAIL,
            message: 'Already Exist Role',
          },
          HttpStatus.BAD_REQUEST,
        );
      const role = await this.roleModel.create(createRoleDto);
      return {
        status: StatusResponse.SUCCESS,
        message: 'Create Role Success',
        data: role,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
  async update(id: string, _role: UpdateRoleDto) {
    try {
      if (id === adminRole)
        throw new HttpException(
          {
            message: `You Don't Have Permission To Change Admin Role`,
            status: HttpStatus.FORBIDDEN,
          },
          HttpStatus.FORBIDDEN,
        );
      const role = await this.roleModel.findById(new Types.ObjectId(id));
      if (!role)
        throw new HttpException(
          {
            status: StatusResponse.FAIL,
            message: 'Role By Id Is Not Exists',
          },
          HttpStatus.BAD_REQUEST,
        );
      const checkName = await this.roleModel.findOne({ name: _role.name });
      if (checkName)
        throw new HttpException(
          {
            status: StatusResponse.FAIL,
            message: 'Role Name Already Exists',
          },
          HttpStatus.BAD_REQUEST,
        );
      role.name = _role.name;
      await role.save();
      return {
        status: StatusResponse.SUCCESS,
        message: 'Update Role Success',
        data: role,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
  async delete(id: string) {
    try {
      if (id === adminRole)
        throw new ForbiddenException({
          message: "You Don't Have Permission To Delete Admin Role",
        });
      const role = await this.roleModel.findByIdAndDelete(
        new Types.ObjectId(id),
      );
      if (!role)
        throw new HttpException(
          {
            status: StatusResponse.FAIL,
            message: 'Role By Id Not Exists',
          },
          HttpStatus.BAD_REQUEST,
        );
      await this.permissionModel.deleteMany({
        role: new Types.ObjectId(id),
      });
      return {
        status: StatusResponse.SUCCESS,
        message: 'Role Deleted Successfully!',
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
  async getById(id: string) {
    try {
      const role = await this.roleModel.findById(new Types.ObjectId(id));
      if (!role)
        throw new HttpException(
          {
            status: StatusResponse.FAIL,
            message: 'Role By Id Is Not Exists',
          },
          HttpStatus.BAD_REQUEST,
        );
      return {
        status: StatusResponse.SUCCESS,
        message: 'Get Role By Id Succes',
        data: role,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
  async getAll() {
    try {
      const roles = await this.roleModel.find();
      return {
        status: StatusResponse.SUCCESS,
        message: 'Get List Role successfully',
        data: roles,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { status: HttpStatus.BAD_GATEWAY, error },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
