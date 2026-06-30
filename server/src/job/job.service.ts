import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'src/schemas/job.schema';
import mongoose, { Model } from 'mongoose';
import { CompanyService } from 'src/company/company.service';
import { SearchJobDto } from './dto/searchJob.dto';
import { JobStatus } from 'commons/job.common';

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    private readonly companyService: CompanyService,
  ) {}
  async create(createJobDto: CreateJobDto, userId: string) {
    const isValidUserId = mongoose.isValidObjectId(userId);
    if (!isValidUserId) {
      throw new BadRequestException('Invalid userId');
    }
    const company = await this.companyService.findCompany(userId);
    if (!company) {
      throw new NotFoundException('you are not created company yet');
    }
    const companyId = company._id;
    const newJob = await this.jobModel.create({
      title: createJobDto.title,
      description: createJobDto.description,
      salary: createJobDto.salary,
      level: createJobDto.level,
      type: createJobDto.type,
      location: createJobDto.location,
      requiredSkills: createJobDto.requiredSkills,
      companyId,
    });
    if (!newJob) {
      throw new InternalServerErrorException('new job is not created!');
    }
    console.log('new job is!', newJob);
    return newJob;
  }

  async findAll() {
    const allJobs = await this.jobModel.find({ status: JobStatus.Open });
    if (allJobs.length === 0) {
      throw new NotFoundException('Jobs are not found');
    }
    return allJobs;
  }

  async findAllMyJobs(userId: string) {
    const company = await this.companyService.findCompany(userId);
    if (!company) {
      throw new NotFoundException('you are not created company yet');
    }
    const companyId = company._id;
    const allMyJobs = await this.jobModel.find({ companyId });
    if (allMyJobs.length === 0) {
      throw new NotFoundException('you are not created jobs yet');
    }
    return allMyJobs;
  }

  async findOne(jobId: string) {
    const job = await this.jobModel
      .findById(jobId)
      .populate('companyId', 'name about socialMedia');
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  async update(jobId: string, updateJobDto: UpdateJobDto) {
    const updatedJob = await this.jobModel.findByIdAndUpdate(
      jobId,
      updateJobDto,
      { new: true },
    );
    if (!updatedJob) {
      throw new NotFoundException('job not found and updated');
    }
    return updatedJob;
  }

  async updateJobStatus(jobId: string) {
    const job = await this.jobModel.findById(jobId);
    if (!job) {
      throw new NotFoundException('job not found and updated');
    }
    job.status = JobStatus.Close;
    const updatedJob = await job.save();
    return updatedJob;
  }

  async remove(jobId: string) {
    const job = await this.jobModel.findByIdAndDelete(jobId);
    if (!job) {
      throw new NotFoundException('job not found and deleted');
    }
    return 'job successfully deleted';
  }

  async serachJob(searchQuery: SearchJobDto) {
    const jobs = await this.jobModel.find({
      title: { $regex: searchQuery.title, $options: 'i' },
    });
    if (jobs.length === 0) {
      throw new NotFoundException(`not found ${searchQuery.title} jobs`);
    }
    return jobs;
  }
}
