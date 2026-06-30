import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { RolesGuard } from 'src/auth/role.guard';
import { UserRole } from 'commons/userRoles.common';
import { Roles } from 'src/auth/roles.decorators';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/interface/user.interfcae';
import { GenerateJdDto } from './dto/generatejd.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('jobfit/:jobId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.JobSeeker)
  jobFit(@Param('jobId') jobId: string, @Req() req: Request & { user: User }) {
    return this.aiService.jobFit(jobId, req.user.id);
  }

  @Get('improveprofile/:jobId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.JobSeeker)
  improveProfile(
    @Param('jobId') jobId: string,
    @Req() req: Request & { user: User },
  ) {
    return this.aiService.improveProfile(jobId, req.user.id);
  }

  @Get('analyzecandidate/:applicationId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Employer)
  analyzeCandidate(@Param('applicationId') applicationId: string) {
    return this.aiService.analyzeCandidate(applicationId);
  }

  @Post('/generatejd')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Employer)
  generateJd(@Body() generateJdDto: GenerateJdDto) {
    return this.aiService.generateJobDescription(generateJdDto);
  }
}
