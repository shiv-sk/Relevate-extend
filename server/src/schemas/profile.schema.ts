import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true, index: true })
  email: string;

  @Prop({ required: true, trim: true })
  bio: string;

  @Prop({ type: [String], default: [], trim: true })
  skills: string[];

  @Prop({ required: true, trim: true })
  currentLocation: string;

  @Prop({ required: true, trim: true })
  lookingFor: string;

  @Prop({
    type: [
      {
        name: String,
        link: String,
      },
    ],
    default: [],
  })
  socialMedia: {
    name: string;
    link: string;
  }[];

  @Prop({
    type: [
      {
        institute: { type: String, trim: true },
        degree: { type: String, trim: true },
        passoutYear: { type: Number },
      },
    ],
    default: [],
  })
  education: {
    institute: string;
    degree: string;
    passoutYear: number;
  }[];

  @Prop({
    type: [
      {
        company: { type: String, trim: true },
        role: { type: String, trim: true },
        years: { type: Number, default: 0 },
      },
    ],
    default: [],
  })
  experience: {
    company: string;
    role: string;
    years: number;
  }[];

  @Prop({
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
  })
  projects: {
    name: string;
    description: string;
    links?: {
      github?: string;
      live?: string;
      demo?: string;
      article?: string;
    };
  }[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
