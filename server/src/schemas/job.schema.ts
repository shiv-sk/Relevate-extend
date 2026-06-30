import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { JobLevel, JobLocation, JobStatus, JobType } from 'commons/job.common';

export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true, trim: true, index: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, trim: true })
  salary: string;

  @Prop({ type: [String], required: true })
  requiredSkills: string[];

  @Prop({ type: String, enum: JobLevel, default: JobLevel.Entry })
  level: JobLevel;

  @Prop({ type: String, enum: JobType, default: JobType.FullTime })
  type: JobType;

  @Prop({
    type: String,
    enum: JobLocation,
    default: JobLocation.Onsite,
  })
  location: JobLocation;

  @Prop({ type: String, enum: JobStatus, default: JobStatus.Open })
  status: JobStatus;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
    index: true,
  })
  companyId: Types.ObjectId;
}

export const JobSchema = SchemaFactory.createForClass(Job);
