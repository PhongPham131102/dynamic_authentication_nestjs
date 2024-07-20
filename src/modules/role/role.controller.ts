import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { ActionEnum, SubjectEnum } from '../permission/permission.entity';
import { ObjectIdValidationPipe } from 'src/pipes/isValidObjectId.pipe';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Authorization(SubjectEnum.ROLE, ActionEnum.READ)
  @Get('/get-all')
  async getAll() {
    return this.roleService.getAll();
  }
  @Authorization(SubjectEnum.ROLE, ActionEnum.READ)
  @Get('/:id')
  async getById(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.roleService.getById(id);
  }
  @Authorization(SubjectEnum.ROLE, ActionEnum.UPDATE)
  @Put('/:id')
  async update(
    @Body() role: UpdateRoleDto,
    @Param('id', ObjectIdValidationPipe) id: string,
  ) {
    return this.roleService.update(id, role);
  }
  @Authorization(SubjectEnum.ROLE, ActionEnum.CREATE)
  @Post('')
  async create(@Body() role: CreateRoleDto) {
    return this.roleService.create(role);
  }
  @Authorization(SubjectEnum.ROLE, ActionEnum.DELETE)
  @Delete('/:id')
  async delete(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.roleService.delete(id);
  }
}
