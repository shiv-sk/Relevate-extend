import { Application } from 'src/schemas/application.schema';

export type PopulatedApplication = Application & {
  jobId: {
    _id: string;
    title: string;
    companyId: {
      _id: string;
      name: string;
    };
  };
  userId: {
    _id: string;
    name: string;
    email: string;
  };
};
