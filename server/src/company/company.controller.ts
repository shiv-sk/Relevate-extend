import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorators';
import { UserRole } from 'commons/userRoles.common';
import { RolesGuard } from 'src/auth/role.guard';
import { User } from 'src/auth/interface/user.interfcae';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Employer)
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @Req() req: Request & { user: User },
  ) {
    return this.companyService.create(createCompanyDto, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Employer)
  findCompnay(@Req() req: Request & { user: User }) {
    const userId = req.user.id;
    return this.companyService.findCompany(userId);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Employer)
  update(
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() req: Request & { user: User },
  ) {
    const userId = req.user.id;
    return this.companyService.update(userId, updateCompanyDto);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Employer)
  remove(@Req() req: Request & { user: User }) {
    const userId = req.user.id;
    return this.companyService.remove(userId);
  }
}
