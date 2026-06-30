import { Availability, Experience, PreferredLocation, SalaryExcepted } from "@/constants/applicationFilterContest"

export interface ApplicationOptions {
    salaryExcepted: string,
    preferredLocation: string,
    availability: string,
    experience: string
}

export interface UserApplication {
    _id: string,
    jobId:{
        title: string,
        companyId:{
            _id: string
            name: string,
        }
    },
    userId: string,
    profileId: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
    profileSnapshot?:{
        lookingFor: string,
        skills: string[],
        experience:{
            company: string,
            role: string,
            years: number,
            noticePeriod: string
        }[],
        projects:{
            name: string,
            description: string;
            links:{
                github: string,
                live: string,
                demo: string,
                article: string
            }
        }[]
    },
    salaryExcepted: string,
    preferredLocation: string,
    experience: string,
    availability: string,
}

export interface JobApplication {
    salaryExcepted: string,
    preferredLocation: string,
    availability: string,
    experience: string,
    _id: string,
    jobId: string,
    userId: string,
    profileId: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    profileSnapshot:{
        name: string,
        email: string,
        currentLocation: string;
        lookingFor: string,
        skills: string[],
        experience:{
            company: string,
            role: string,
            years: number,
            noticePeriod: string
        }[],
        projects:{
            name: string,
            description: string;
            links:{
                github: string,
                live: string,
                demo: string,
                article: string
            }
        }[]
    }
}

export interface ApplicationFilters {
    salaryExcepted: SalaryExcepted,
    preferredLocation: PreferredLocation,
    availability: Availability,
    experience: Experience,
    projectCheck: boolean,
    experienceCheck: boolean,
}