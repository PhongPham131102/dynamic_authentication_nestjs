import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permisstion.dto';
import { UpdatePermisstionDto } from './dto/update-permisstion.dto';
import { Authorization } from 'src/decorators/authorization.decorator';
import { CreatePermissionRoleDto } from './dto/create-permission-role.dto';
import { UpdatePermissionRoleDto } from './dto/update-permission-role.dto';
import { ActionEnum, SubjectEnum } from './permission.entity';
import { ObjectIdValidationPipe } from 'src/pipes/isValidObjectId.pipe';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @Authorization(SubjectEnum.ROLE, ActionEnum.CREATE)
  @Post('/create-permission-role')
  async createPermissionRole(@Body() permission: CreatePermissionRoleDto) {
    return this.permissionService.createPermissionRole(permission);
  }
  @Authorization(SubjectEnum.ROLE, ActionEnum.CREATE)
  @Post('/')
  async create(@Body() permission: CreatePermissionDto) {
    return this.permissionService.createPermission(permission);
  }
  @Authorization(SubjectEnum.ROLE, ActionEnum.DELETE)
  @Delete('/:id')
  async delete(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.permissionService.delete(id);
  }
  @Authorization(SubjectEnum.ROLE, ActionEnum.UPDATE)
  @Put('update-permission-by-role-id/:id')
  async UpdatePermissionByRoleId(
    @Body() permission: UpdatePermissionRoleDto,
    @Param('id', ObjectIdValidationPipe) id: string,
  ) {
    return this.permissionService.updatePermissionByRoleId(id, permission);
  }
  @Authorization(SubjectEnum.ROLE, ActionEnum.UPDATE)
  @Put('/:id')
  async update(
    @Body() permission: UpdatePermisstionDto,
    @Param('id') id: string,
  ) {
    return this.permissionService.updateById(id, permission);
  }
  @Authorization(SubjectEnum.ROLE, ActionEnum.READ)
  @Get('get-all')
  async GetAll() {
    return this.permissionService.GetAll();
  }
  @Authorization(SubjectEnum.ROLE, ActionEnum.READ)
  @Get('get-all-by-role-id/:id')
  async GetAllByRoleId(@Param('id') id: string) {
    return this.permissionService.getAllByRoleId(id);
  }
  @Authorization(SubjectEnum.ROLE, ActionEnum.READ)
  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.permissionService.getById(id);
  }
}
