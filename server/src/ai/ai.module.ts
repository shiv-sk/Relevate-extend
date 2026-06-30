import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { JobModule } from 'src/job/job.module';
import { ProfileModule } from 'src/profile/profile.module';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [JobModule, ProfileModule, ApplicationModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
