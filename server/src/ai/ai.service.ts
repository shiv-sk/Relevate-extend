import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { JobService } from 'src/job/job.service';
import { ApplicationService } from 'src/application/application.service';
import { isValidObjectId } from 'mongoose';
import { GenerateJdDto } from './dto/generatejd.dto';
import { jobfitPrompt } from './prompts/jobfit.prompt';
import { generateAIContent } from './geminiClient';
import { improveProfilePrompt } from './prompts/improveProfile.prompt';
import { analyzeCandidatePrompt } from './prompts/candidateanalyze.prompt';
import { jdGeneratePrompt } from './prompts/jdgenerator.prompt';

@Injectable()
export class AiService {
  constructor(
    private readonly jobService: JobService,
    private readonly profileService: ProfileService,
    private readonly applicationService: ApplicationService,
  ) {}
  async jobFit(jobId: string, userId: string) {
    const job = await this.jobService.findOne(jobId);
    if (!job) {
      throw new NotFoundException('job not found');
    }
    const profile = await this.profileService.findUserProfile(userId);
    if (!profile) {
      throw new NotFoundException('profile not found');
    }
    const candidateExperience =
      profile.experience.length > 0 ? profile.experience : 'Not Provided';
    const candidateProjects =
      profile.projects.length > 0 ? profile.projects : 'Not Provided';
    const promptData = {
      jobDescription: job.description,
      requiredSkills: job.requiredSkills,
      candidateSkills: profile.skills,
      candidateExperience: candidateExperience,
      candidateProjects: candidateProjects,
    };
    const prompt = jobfitPrompt(promptData);
    const systemInstruction =
      'You are ReVA, an AI assistant for a job portal.Your task is to help compare job descriptions and requested user profiles.';
    const response = await generateAIContent(prompt, systemInstruction);
    return response;
  }

  async improveProfile(jobId: string, userId: string) {
    const job = await this.jobService.findOne(jobId);
    if (!job) {
      throw new NotFoundException('job not found');
    }
    const profile = await this.profileService.findUserProfile(userId);
    if (!profile) {
      throw new NotFoundException('profile not found');
    }
    const candidateExperience =
      profile.experience.length > 0 ? profile.experience : 'Not Provided';
    const candidateProjects =
      profile.projects.length > 0 ? profile.projects : 'Not Provided';
    const promptData = {
      jobDescription: job.description,
      requiredSkills: job.requiredSkills,
      candidateSkills: profile.skills,
      candidateExperience: candidateExperience,
      candidateProjects: candidateProjects,
    };
    const prompt = improveProfilePrompt(promptData);
    const systemInstruction =
      'You are ReVA, an AI assistant for a job portal.Your task is to help compare job descriptions and requested user profiles.';
    const response = await generateAIContent(prompt, systemInstruction);
    return response;
  }

  async analyzeCandidate(applicationId: string) {
    const application =
      await this.applicationService.findJobApplication(applicationId);
    if (!application) {
      throw new NotFoundException('application not found');
    }
    const isValidJobId = isValidObjectId(application.jobId);
    if (!isValidJobId) {
      throw new NotFoundException('jobId is invalid');
    }
    const job = await this.jobService.findOne(application.jobId.toString());
    if (!job) {
      throw new NotFoundException('job not found');
    }
    const candidateExperience =
      application.profileSnapshot?.experience &&
      application.profileSnapshot?.experience?.length > 0
        ? application.profileSnapshot?.experience
        : 'Not Provided';
    const candidateProjects =
      application.profileSnapshot?.projects &&
      application.profileSnapshot?.projects?.length > 0
        ? application.profileSnapshot?.projects
        : 'Not Provided';
    const promptData = {
      jobDescription: job.description,
      requiredSkills: job.requiredSkills,
      candidateSkills: application.profileSnapshot?.skills || [],
      candidateExperience: candidateExperience,
      candidateProjects: candidateProjects,
    };
    const prompt = analyzeCandidatePrompt(promptData);
    const systemInstruction =
      'You are ReVA, an AI assistant for a job portal.Your task is to help employer make decision on candidate selection by comparing job descriptions and candidate profiles.';
    const response = await generateAIContent(prompt, systemInstruction);
    return response;
  }

  async generateJobDescription(generateJdDto: GenerateJdDto) {
    const promptData = {
      title: generateJdDto.title,
      jobDescription: generateJdDto.description,
      requiredSkills: generateJdDto.requiredSkills,
    };
    const prompt = jdGeneratePrompt(promptData);
    const systemInstruction =
      'You are ReVA, an AI assistant for a job portal.Your task is to help employer make better job description based on given data.';
    const response = await generateAIContent(prompt, systemInstruction);
    return response;
  }
}
