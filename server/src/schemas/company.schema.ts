import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

  @Prop({ required: true, trim: true, unique: true, index: true })
  officialEmail: string;

  @Prop({ required: true, trim: true })
  about: string;

  @Prop({ required: true, trim: true })
  domain: string;

  @Prop({ required: true, trim: true })
  size: string;

  @Prop({ required: true, trim: true })
  location: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  userId: Types.ObjectId;

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
}

export const CompanySchema = SchemaFactory.createForClass(Company);
