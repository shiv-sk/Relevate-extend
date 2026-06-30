export interface Education {
    institute?: string,
    degree?: string,
    passoutYear?: number
}

export interface Experience {
    company?: string,
    role?: string,
    noticePeriod?: string,
    years?: number,
}

export interface Projects{
    name?: string,
    description?: string,
    links?: {
        github?: string,
        live?: string,
        demo?: string,
        article?: string,
    }
}

export interface SocialMedia{
    name?: string,
    link?: string,
}

export interface ProfileInterface {
    _id?: string,
    name: string,
    email: string,
    bio: string,
    currentLocation: string,
    lookingFor: string,
    skills: string[],
    education:Education[],
    projects:Projects[],
    experience:Experience[],
    socialMedia:SocialMedia[],
}