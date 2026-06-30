import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorators';
import { UserRole } from 'commons/userRoles.common';
import { Request } from 'express';
import { User } from 'src/auth/interface/user.interfcae';
import { SearchJobDto } from './dto/searchJob.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Employer)
  create(
    @Body() createJobDto: CreateJobDto,
    @Req() req: Request & { user: User },
  ) {
    return this.jobService.create(createJobDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  @Get('/search')
  searchJobs(@Query() searchQuery: SearchJobDto) {
    return this.jobService.serachJob(searchQuery);
  }

  @Get('/myjobs')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Employer)
  findAllMyJobs(@Req() req: Request & { user: User }) {
    return this.jobService.findAllMyJobs(req.user.id);
  }

  @Get(':jobId')
  findOne(@Param('jobId') jobId: string) {
    return this.jobService.findOne(jobId);
  }

  @Patch(':jobId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Employer)
  update(@Param('jobId') jobId: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(jobId, updateJobDto);
  }

  @Patch('/status/:jobId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Employer)
  updateJobStatus(@Param('jobId') jobId: string) {
    return this.jobService.updateJobStatus(jobId);
  }

  @Delete(':jobId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Employer)
  remove(@Param('jobId') jobId: string) {
    return this.jobService.remove(jobId);
  }
}
