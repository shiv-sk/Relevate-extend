import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import {
  ApplicationStatus,
  Availability,
  Experience,
  PreferredLocation,
  SalaryExcepted,
} from 'commons/application.common';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema({ timestamps: true })
export class Application {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  })
  jobId: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  })
  profileId: Types.ObjectId;
  @Prop({
    type: {
      skills: { type: [String], default: [] },
      lookingFor: { type: String, trim: true },
      name: { type: String, trim: true },
      email: { type: String, trim: true },
      currentLocation: { type: String, trim: true },
      experience: {
        type: [
          {
            company: { type: String, trim: true },
            role: { type: String, trim: true },
            years: { type: Number, default: 0 },
          },
        ],
        default: [],
      },
      projects: {
        type: [
          {
            name: { type: String, trim: true },
            description: { type: String, trim: true },
            links: {
              github: { type: String, trim: true },
              live: { type: String, trim: true },
              demo: { type: String, trim: true },
            },
          },
        ],
        default: [],
      },
    },
    default: {},
  })
  profileSnapshot: {
    lookingFor: string;
    name: string;
    email: string;
    currentLocation: string;
    skills?: string[];
    experience?: {
      company: string;
      role: string;
      years: number;
    }[];
    projects?: {
      name: string;
      description: string;
      links?: {
        github?: string;
        live?: string;
        demo?: string;
      };
    }[];
  };

  @Prop({
    type: String,
    enum: ApplicationStatus,
    default: ApplicationStatus.Applied,
    trim: true,
  })
  status: ApplicationStatus;

  @Prop({
    type: String,
    enum: SalaryExcepted,
    default: SalaryExcepted.ThreeToFive,
    trim: true,
  })
  salaryExcepted: SalaryExcepted;

  @Prop({
    type: String,
    enum: PreferredLocation,
    default: PreferredLocation.allOfTheAbove,
    trim: true,
  })
  preferredLocation: PreferredLocation;

  @Prop({
    type: String,
    enum: Availability,
    default: Availability.immediate,
    trim: true,
  })
  availability: Availability;

  @Prop({
    type: String,
    enum: Experience,
    default: Experience.zeroToTwo,
    trim: true,
  })
  experience: Experience;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
